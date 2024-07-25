import React, { useState, useEffect, useCallback } from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchDeals, getStores } from '../../../../services/apiCheapShark';
import { Deal } from "./dataApiOffert";
import debounce from 'lodash/debounce';

interface Store {
  storeID: string;
  storeName: string;
}

interface SearchBarProps {
  onDealsFetched: (deals: Deal[]) => void;
  onSelectDeal: (deal: Deal) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onDealsFetched, onSelectDeal }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Deal[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeals = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true);
      const deals = await searchDeals(query);
      const dealsWithStoreNames = deals.map((deal: any) => ({
        ...deal,
        storeName: getStoreName(deal.storeID),
      }));

      const bestDeals = getBestDeals(dealsWithStoreNames);

      setOptions(bestDeals);
      setIsLoading(false);
      onDealsFetched(bestDeals);
    }, 500),
    [onDealsFetched, stores]
  );

  const fetchStores = useCallback(async () => {
    const storesData = await getStores();
    setStores(storesData);
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  useEffect(() => {
    if (inputValue) {
      fetchDeals(inputValue);
    } else {
      setOptions([]);
      setOpen(false);
    }
  }, [inputValue, fetchDeals]);

  const handleSelectDeal = useCallback((deal: Deal) => {
    onSelectDeal(deal);
    setInputValue(deal.title);
    setOpen(false);
  }, [onSelectDeal]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && options.length > 0) {
      handleSelectDeal(options[0]);
    }
  };

  const getStoreName = useCallback((storeID: string) => {
    const store = stores.find(store => store.storeID === storeID);
    return store ? store.storeName : "Unknown Store";
  }, [stores]);

  const getBestDeals = useCallback((deals: Deal[]): Deal[] => {
    const dealsMap = new Map<string, Deal>();
    deals.forEach(deal => {
      if (!dealsMap.has(deal.title) || deal.salePrice < (dealsMap.get(deal.title)?.salePrice || Infinity)) {
        dealsMap.set(deal.title, deal);
      }
    });
    return Array.from(dealsMap.values());
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <Autocomplete
        value={null}
        open={open}
        onClose={() => setOpen(false)}
        onChange={(event, newValue) => {
          if (newValue) {
            handleSelectDeal(newValue as Deal);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
        options={options}
        getOptionLabel={(option) => option.title}
        loading={isLoading}
        sx={{ flexGrow: 1 }}
        renderOption={(props, option) => (
          <li {...props} key={option.dealID}>
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar ofertas"
            variant="outlined"
            size="small"
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "0px",
                borderBottomLeftRadius: "4px",
                borderTopLeftRadius: "4px",
                backgroundColor: "#383446",
                color: "white",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#14101F",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#14101F",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1e182e",
                },
                "& .MuiAutocomplete-endAdornment": {
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              },
            }}
          />
        )}
      />
      <Button
        size="large"
        variant="contained"
        onClick={() => {
          setInputValue('');
          setOpen(false);
        }}
        sx={{
          backgroundColor: "#14101F",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: "none",
          minWidth: "auto",
          padding: "8px 8px",
          "&:hover": {
            backgroundColor: "#1E192D",
          },
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default React.memo(SearchBar);
