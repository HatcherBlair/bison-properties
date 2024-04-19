import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PropertyCard({
  name,
  description,
  price,
  leased,
}: {
  name: string;
  description: string;
  price: number;
  leased: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          ${price.toFixed(2)} /mo | {leased ? "Leased" : "Available"}
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>This is a footer</CardFooter>
    </Card>
  );
}
