import { gql } from "@apollo/client";

export const GET_CITY_WEATHER_QUERY = gql`
  query getCityByName(
    $name: String!
    $country: String!
    $config: ConfigInput!
  ) {
    getCityByName(name: $name, country: $country, config: $config) {
      name
      country
      weather {
        summary {
          title
          description
          icon
        }
        timestamp
        temperature {
          actual
          feelsLike
          min
          max
        }
      }
    }
  }
`;
