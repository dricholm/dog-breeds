const host = 'https://dog.ceo/api';

interface DogApiResponse {
  message: any;
  status: string;
}

const fetchBreedList = async (): Promise<{ [breed: string]: string[] }> => {
  const response = await fetch(`${host}/breeds/list/all`);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data: DogApiResponse = await response.json();
  return data.message;
};

const fetchImages = async (breed: string, sub: string): Promise<string[]> => {
  const path =
    sub == null ? `breed/${breed}/images` : `breed/${breed}/${sub}/images`;

  const response = await fetch(`${host}/${path}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data: DogApiResponse = await response.json();
  return data.message;
};

const fetchRandomImage = async (
  breed: string,
  sub: string
): Promise<string> => {
  const path =
    sub == null
      ? `breed/${breed}/images/random`
      : `breed/${breed}/${sub}/images/random`;

  const response = await fetch(`${host}/${path}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data: DogApiResponse = await response.json();
  return data.message;
};

export { fetchBreedList, fetchImages, fetchRandomImage };
