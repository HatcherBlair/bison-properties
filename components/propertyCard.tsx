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
    <Card
      className={cn(
        "box-border flex flex-col text-center items-center bg-slate-300",
        className
      )}
      {...props}
    >
      <CardHeader className="m-0 p-0 pb-2">
        <CardTitle>
          {coverPhoto ? (
            <img
              className="w-full rounded-sm  m-0 h-auto "
              src={coverPhoto}
              alt={`${property.addressLineOne} cover photo`}
            />
          ) : (
            <div>No photo</div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-xl">
          {property.addressLineOne} {property.addressLineTwo}
        </p>
        <p className="font-semibold text-xl">
          {property.city}, {property.state} {property.zip}
        </p>
        <p className="font-semibold text-lg">
          {property.leased ? "Leased" : "Available"} |
          {property.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          /mo
        </p>
      </CardContent>
    </Card>
  );
}
