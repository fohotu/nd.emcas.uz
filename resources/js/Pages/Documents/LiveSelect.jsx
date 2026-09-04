import AsyncSelect from "react-select/async";
import axios from "axios";
import { useRef } from "react";

export default function LiveSelect({ type,onChange }) {
  
  const cache = useRef({});
  const timeout = useRef(null);

  const getUrl = (type) => {
    switch (type) {
      case "category":
        return "/category/live-search";
      case "menu":
        return "/menu/live-search";
      default:
        return "/category/live-search";
    }
  };

  const loadOptions1 = (inputValue, callback) => {
    if (!inputValue) {
    // callback([]);
      return;
    }

    const cacheKey = `${type}-${inputValue}`;

    // 🔥 cache
    if (cache.current[cacheKey]) {
     // callback(cache.current[cacheKey]);
      return;
    }

    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      try {
        const url = getUrl(type);

        const res = await axios.get(url, {
          params: { search: inputValue },
        });
        /*
        const options = res.data.data.map((item) => ({
          value: item.id,
          label: String(item.title ?? item.name ?? ""),
        }));
        */

       // cache.current[cacheKey] = options;
        cache.current[cacheKey] = res;

      //  callback(res);
      } catch (error) {
        console.error(error);
       // callback([]);
      }
    }, 400);
  };

  const loadOptions = (inputValue, callback) => {
    
    if (!inputValue) {
        callback([]);
        return;
    }

    const cacheKey = `${type}-${inputValue}`;

    if (cache.current[cacheKey]) {
        callback(cache.current[cacheKey]);
        return;
    }

    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
        try {
            const res = await axios.get(getUrl(type), {
                params: {
                    title: inputValue,
                },
            });

            // API уже вернул [{value, label}]
            const options = res.data;

            cache.current[cacheKey] = options;

            callback(options);

        } catch (error) {
            console.error(error);
            callback([]);
        }
    }, 400);
};

  return (
    <AsyncSelect
      clearable={true}
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      noOptionsMessage={() => "Ничего не найдено"}
      loadingMessage={() => "Загрузка..."}
      onChange={(selected) => {
            if (onChange) {
              onChange(selected);
            }
      }}
      styles={{
        control: (base) => ({
            ...base,
            minHeight: "45px",
            height: "45px",
        }),
        valueContainer: (base) => ({
            ...base,
            height: "45px",
            padding: "0 12px",
        }),
        indicatorsContainer: (base) => ({
            ...base,
            height: "45px",
        }),
      }}
    />
  );
}