export interface Shape {
  type: string;
  properties: properties;
  geometry: Geometry;
}

export interface CreateShape {
  addressId: number;
  geometry: Geometry;
}

export interface Address extends CreateAddress {
  id: number;
}

export interface CreateAddress {
  name: string;
  description: string;
}

export interface properties {
  id: string;
  name: string;
  description: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][];
}
