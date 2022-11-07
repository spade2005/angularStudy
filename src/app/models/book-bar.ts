export interface BookBar {
  id: number;
  name: string;
  sortBy: number;
  pageId: number;
  link: string;
  children: BookBar[]
}

