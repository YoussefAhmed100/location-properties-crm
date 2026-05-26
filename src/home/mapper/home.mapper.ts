import { About } from 'src/about-us/schema/about.schema';

import { HomePageResponseDto } from '../dto/home-page.response.dto';

export class HomeMapper {
  static toHomePageResponse(about: About): HomePageResponseDto {
    return {
      title: about.heroSection.title,

      description: about.heroSection.description,

      yearsExperience: about.expertiseSection.yearsExperience,

      happyClients: about.expertiseSection.happyClients,

      closedDeals: about.expertiseSection.closedDeals,

      support: about.servicesSection.support,
    };
  }
}
