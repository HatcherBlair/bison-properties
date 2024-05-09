import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Property } from "@/types/Property";
import { cn } from "@/lib/utils";
import { getURL } from "@/AWSComponents/s3Actions";

type CardProps = Omit<React.ComponentProps<typeof Card>, "property"> & {
  property: Property;
};

export default async function PropertyCard({
  property,
  className,
  ...props
}: CardProps) {
  const coverPhoto = property.photos?.length
    ? await getURL(`${property.id}/${property.photos?.at(0)?.Key}`)
    : null;
  return (
    <Card className={cn("w-[400px]", className)} {...props}>
      <CardHeader>
        <CardTitle>
          {property.addressLineOne} {property.addressLineTwo}
        </CardTitle>
        <CardDescription>
          {property.city}, {property.state} {property.zip}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {coverPhoto ? (
          <img className="w-[50px] h-auto object-cover" src={coverPhoto} />
        ) : (
          <div>No photo</div>
        )}
      </CardContent>
      <CardFooter>
        {property.leased ? "Leased" : "Available"} |
        {property.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        /mo
      </CardFooter>
    </Card>
  );
}
