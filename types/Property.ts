export default interface Property {
  id: string;
  description: string;
  leased: boolean;
  numUnits: number;
  address: string;
  photos: {
    id: string;
    path: string;
    isVideo: boolean;
  };
}
