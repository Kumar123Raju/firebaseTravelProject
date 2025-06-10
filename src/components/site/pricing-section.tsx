import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Map, Clock, Car } from "lucide-react";

const PricingSection = () => {
  const cityToCityPrices = [
    { from: "Hazaribagh", to: "TATA (Jamshedpur)", price: "₹3400" },
    { from: "Hazaribagh", to: "Ranchi", price: "₹2200" },
    { from: "Ranchi", to: "Patna", price: "₹7300" },
    { from: "Hazaribagh", to: "Dhanbad", price: "₹3000" },
    { from: "Hazaribagh", to: "Gaya", price: "₹3500" },
    { from: "Ranchi", to: "Kolkata", price: "₹8500" },
  ];

  const localFixedRates = [
    { vehicle: "Sedan", duration: "4hr / 40km", price: "₹1200" },
    { vehicle: "Sedan", duration: "8hr / 80km", price: "₹2000" },
    { vehicle: "SUV", duration: "4hr / 40km", price: "₹1800" },
    { vehicle: "SUV", duration: "8hr / 80km", price: "₹2800" },
  ];

  const localDistanceRates = [
    { type: "Sedan - Outstation", rate: "₹10-12/km" },
    { type: "SUV - Outstation", rate: "₹14-16/km" },
    { type: "Local Usage (Extra km)", rate: "Sedan @ ₹10/km, SUV @ ₹13/km" },
  ];

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold mb-10 text-center text-foreground">
          <DollarSign className="inline-block w-8 h-8 mr-2 text-primary" />
          Affordable Travel Rates
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Map className="w-6 h-6 mr-2 text-primary" />
                City-to-City Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cityToCityPrices.map((route, index) => (
                    <TableRow key={index}>
                      <TableCell>{route.from}</TableCell>
                      <TableCell>{route.to}</TableCell>
                      <TableCell className="text-right font-medium">{route.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
               <p className="text-xs text-muted-foreground mt-2">*Prices are indicative for one-way trips. Tolls & parking extra.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Clock className="w-6 h-6 mr-2 text-primary" />
                Local Trip Packages (Hazaribagh Area)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-lg mb-2 text-foreground">Fixed Duration Rates:</h4>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localFixedRates.map((rate, index) => (
                    <TableRow key={index}>
                      <TableCell>{rate.vehicle}</TableCell>
                      <TableCell>{rate.duration}</TableCell>
                      <TableCell className="text-right font-medium">{rate.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <h4 className="font-semibold text-lg mb-2 text-foreground">Distance-Based Rates:</h4>
               <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {localDistanceRates.map((rate, index) => (
                    <li key={index}><span className="font-medium text-foreground">{rate.type}:</span> {rate.rate}</li>
                ))}
               </ul>
               <p className="text-xs text-muted-foreground mt-2">*Driver allowance applicable for outstation night halts.</p>
            </CardContent>
          </Card>
        </div>
         <p className="text-center text-muted-foreground text-sm">
          For custom quotes or specific requirements, please contact us directly.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
