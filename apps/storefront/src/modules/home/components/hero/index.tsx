import { Button, Heading } from "@modules/common/components/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-spd-cream-dark relative bg-spd-cream overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-8">
        <span>
          <Heading
            level="h1"
            className="text-4xl small:text-6xl leading-tight text-spd-green font-artico uppercase tracking-wide"
          >
            SmartPowerDeals
          </Heading>
          <Heading
            level="h2"
            className="text-lg small:text-2xl leading-snug text-spd-green/80 font-normal mt-4"
          >
            Slimme deals voor smart living.
          </Heading>
        </span>
        <div className="flex gap-4">
          <LocalizedClientLink href="/store">
            <button className="bg-spd-green hover:bg-spd-green-dark text-white font-semibold px-8 py-3 rounded transition-colors duration-200">
              Shop bekijken
            </button>
          </LocalizedClientLink>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-spd-green"
        aria-hidden="true"
      />
    </div>
  );
};

export default Hero;
