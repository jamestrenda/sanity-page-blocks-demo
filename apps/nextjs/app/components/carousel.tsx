import { BlocksType } from '@repo/sanity/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Hero } from './hero';

type CarouselBlockProps = BlocksType<'carouselBlock'>;

export const CarouselBlock = ({ items }: CarouselBlockProps) => {
  return (
    items && (
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            playOnInit: true,
            // stopOnMouseEnter: true,
            // stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {Array.isArray(items) &&
            items.map((item, index) => (
              <CarouselItem key={index}>
                <Hero
                  key={`${item._type}-${item._key}`}
                  {...item}
                  showToggles={false}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        {/* <CarouselPrevious />
  <CarouselNext /> */}
      </Carousel>
    )
  );
};

export default Carousel;
