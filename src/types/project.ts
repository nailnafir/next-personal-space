export interface ProjectInterface {
  id: string;
  type: string;
  title: string;
  description: string;
  imagePath: string;
  url: string;
  tools: {
    name: string;
    iconPath: string;
  }[];
}
