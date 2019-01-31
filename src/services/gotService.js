export default class GotService {
  constructor(props) {
    this._apiBase = "https://anapioficeandfire.com/api";
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const result = await this.getResource("/characters?page=5&pageSize=10");
    return result.map(this._transformCharacter);
  };

  getCharacter = async id => {
    const result = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(result);
  };

  getAllHouses = async () => {
    const result = await this.getResource("/houses");
    return result.map(this._transformHouse);
  };
  getHouse = async id => {
    const result = await this.getResource(`/houses/${id}`);
    return this._transformHouse(result);
  };

  getAllBooks = async () => {
    const result = await this.getResource(`/books`);
    return result.map(this._transformBook);
  };

  getBook = async id => {
    const result = await this.getResource(`/books/${id}`);
    return this._transformBook(result);
  };

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
      id: char.url.split("/").reverse()[0]
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
      id: house.url.split("/").reverse()[0]
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released,
      id: book.url.split("/").reverse()[0]
    };
  }
}
