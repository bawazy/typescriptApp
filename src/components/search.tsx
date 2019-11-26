import React, { Component } from 'react'
import './search.css';
import User from '../interfaces/user.interface';

interface SearchState{
    error:boolean,
    pokemon:Pokemon
}

interface Pokemon{
    name:string,
    numberOfAbilities:number,
    baseExperience:number,
    imageUrl:string
}


 class search extends Component<User, SearchState> {
    pokemonRef:React.RefObject<HTMLInputElement>
    constructor(props:User){
        super(props);
        this.pokemonRef=React.createRef();
        this.state={
           pokemon:null,
            error:false
        }
    } 

    onSearchClick=():void =>{
        const inputValue=this.pokemonRef.current.value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
        .then(res=>{
            if(res.status!==200){
                this.setState({error:true});return;
            }
            res.json().then(data=>{
                this.setState({
                    error:false,
                    pokemon:{
                    numberOfAbilities:data.abilities.length,
                    name:data.name,
                    baseExperience:data.base_experience,
                    imageUrl:data.sprites.front_default
                   }
                })
            })
        })
    }
    
    render() {
        const {name:UserName,numberOfPokemons}= this.props;
        const {
                error,
                pokemon
              } = this.state;
        
        let resultMarkUp;

            if (error){
                resultMarkUp=<p>Pokemon Not Found please try again!</p>
            }else if(this.state.pokemon){
          resultMarkUp = <div>
                <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
                <p>
                    {pokemon.name} has {pokemon.numberOfAbilities} abilities and {pokemon.baseExperience} base experience points
                </p>
                </div>
            }

        return (
            <div className="container"> 
                    <p>User {UserName}{' '} 
                        {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}</p>

                <input type="text" ref={this.pokemonRef} className="serchField" id="" placeholder="Search for pokemons"/>
                <button onClick={this.onSearchClick} className='my-btn'>Search</button>

      

           {resultMarkUp}

            </div>
          

        )
    }
}

export default search;