export interface CategoryNode {
  label: string;
  value: string; // id категории
  fullPath: string;
  items?: CategoryNode[]; // дети
}
