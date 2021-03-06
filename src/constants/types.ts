import { CSSProperties } from "react";

export type ItemTypes = {
  key: string;
  icon: string;
  text: string;
};

export const expenseTypes = [
  {
    key: "food",
    icon: "restaurant_menu",
    text: "餐飲",
  },
  {
    key: "cake",
    icon: "cake",
    text: "生日",
  },
  {
    key: "gathering",
    icon: "group",
    text: "聚會",
  },
  {
    key: "transport",
    icon: "train",
    text: "交通",
  },
  {
    key: "car",
    icon: "directions_car",
    text: "汽車",
  },
  {
    key: "home",
    icon: "home",
    text: "家庭",
  },
  {
    key: "waterBill",
    icon: "water_drop",
    text: "水費",
  },
  {
    key: "eletricBill",
    icon: "bolt",
    text: "電費",
  },
  {
    key: "gasBill",
    icon: "gas_meter",
    text: "煤氣",
  },
  {
    key: "phoneBill",
    icon: "signal_cellular_alt",
    text: "電話費",
  },
  {
    key: "health",
    icon: "health_and_safety",
    text: "健康",
  },
  {
    key: "insurance",
    icon: "medical_information",
    text: "保險",
  },
  {
    key: "education",
    icon: "school",
    text: "教育",
  },
  {
    key: "books",
    icon: "menu_book",
    text: "書本",
  },
  {
    key: "pets",
    icon: "pets",
    text: "寵物",
  },
  {
    key: "entertainment",
    icon: "sports_esports",
    text: "娛樂",
  },
  {
    key: "shopping",
    icon: "shopping_cart",
    text: "購物",
  },
  {
    key: "cloth",
    icon: "checkroom",
    text: "衣服",
  },
  {
    key: "debt",
    icon: "attach_money",
    text: "供款",
  },
];

export const incomeTypes = [
  {
    key: "salary",
    icon: "monetization_on",
    text: "薪金",
  },
  {
    key: "interest",
    icon: "account_balance",
    text: "利息",
  },
  {
    key: "sell",
    icon: "sell",
    text: "賣出",
  },
];

export const defaultColors: Exclude<CSSProperties["color"], undefined>[] = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];

export const allIcons = [
  "favorite",
  "start",
  "rocket_launch",
  "handshake",
  "travel_explore",
  "emoji_objects",
  "recycling",
  "vaccines",
  "group_work",
  "monitor_heart",
  "compost",
  "wc",
  "diamond",
  "cruelty_free",
  "recommend",
  "coronavirus",
  "cookie",
  "rocket",
  "masks",
  "vpn_lock",
  "sick",
  "sanitizer",
  "egg",
  "elderly_woman",
  "mail",
  "call",
  "notifications",
  "send",
  "chat",
  "link",
  "inventory_2",
  "photo_camera",
  "brush",
  "flash_on",
  "credit_card",
  "paid",
  "account_balance",
  "trending_up",
  "attach_money",
  "storefront",
  "work",
  "store",
  "sell",
  "savings",
  "qr_code_2",
  "map",
  "restaurant",
  "near_me",
  "local_mall",
  "hiking",
  "laptop_chromebook",
  "balance",
  "android",
];
