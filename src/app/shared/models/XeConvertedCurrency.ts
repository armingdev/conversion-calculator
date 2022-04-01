export interface XeConvertedCurrency {
  "terms": string;
  "privacy": string;
  "to": string;
  "amount": number;
  "timestamp": string;
  "from": [
    {
      "quotecurrency": string;
      "mid": number;
    },
  ]
}
