import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@/types/Property";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <CardDescription>
          ${property.price.toFixed(2)} /mo |{" "}
          {property.leased ? "Leased" : "Available"}
        </CardDescription>
      </CardHeader>
      <CardContent>{property.description}</CardContent>
      <CardFooter>This is a footer</CardFooter>
    </Card>
  );
}
