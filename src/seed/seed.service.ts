import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-responce.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  // Una manera de hacerlo
  async executeSeedPromises() {
    await this.pokemonModel.deleteMany({}); // Elimina los datos existentes de la tabla
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600',
    );

    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      //console.log({ name, url });
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // el + lo convierte en entero

      //console.log({ name, no });
      // const pokemon = await this.pokemonModel.create({ name, no });

      insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    });

    await Promise.all(insertPromisesArray);

    return 'Seed Executed';
  }

  // Forma recomendada por mongo insertMany
  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // Elimina los datos existentes de la tabla
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=900',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
