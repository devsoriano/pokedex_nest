import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-responce.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600',
    );

    data.results.forEach(({ name, url }) => {
      //console.log({ name, url });
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // el + lo convierte en entero
      console.log({ name, no });
    });

    return data.results;
  }
}
