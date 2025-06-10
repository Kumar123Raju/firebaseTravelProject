import type { Car } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Fuel, CheckCircle, XCircle } from "lucide-react";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={car.imageUrl || "https://placehold.co/600x400.png"}
            alt={car.model}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="car vehicle"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-2">{car.model}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>Capacity: {car.capacity} Passengers</span>
          </div>
          {car.features && car.features.length > 0 && (
            <div className="flex items-start">
              <Fuel className="w-4 h-4 mr-2 mt-0.5 text-primary shrink-0" />
              <div>
                Features:{" "}
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {car.availability === "Available" ? (
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 mr-2 text-red-500" />
          )}
          <span className={`font-medium ${car.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
            {car.availability}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <a href="#booking-form-section">Book Now</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
