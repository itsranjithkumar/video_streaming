declare module 'embla-carousel-react' {
  import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
  
  export interface UseEmblaCarouselType {
    (options?: EmblaOptionsType, plugins?: EmblaPluginType[]): [
      React.RefObject<HTMLElement>,
      import('embla-carousel').EmblaCarouselType | undefined
    ];
  }

  const useEmblaCarousel: UseEmblaCarouselType;
  export default useEmblaCarousel;
}
