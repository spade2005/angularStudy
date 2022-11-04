export interface PageFolder {
  id: number;
  name: string;
  mark: string;
  sortBy: number;
  parentId: number;
  bookId: number;
  children: [PageFolder] | any
}
