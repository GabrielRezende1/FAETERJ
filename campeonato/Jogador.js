import ModelError from "/ModelError.js";

export default class Jogador {
    
  //
  // DECLARAÇÃO DE ATRIBUTOS PRIVADOS: Em JavaScript, se o nome do atributo tem # no início, isso 
  // indica que ele é privado. Também deve-se colocar a presença dele destacada, como está abaixo.
  //
  #email;
  #nome;
  #nascimento;
  #jogo;
  #funcao;

  //-----------------------------------------------------------------------------------------//

  constructor(email, nome, nascimento, jogo, funcao) {
    this.setEmail(email);
    this.setNome(nome);
    this.setNascimento(nascimento);
    this.setJogo(jogo);
    this.setFuncao(funcao);      
  }
  
  //-----------------------------------------------------------------------------------------//

  getEmail() {
    return this.#email;
  }
  
  //-----------------------------------------------------------------------------------------//

  setEmail(email) {
    if(!Jogador.validarEmail(email))
      throw new ModelError("Email Inválida: " + email);
    this.#email = email;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Jogador.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.#nome = nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNascimento() {
    return this.#nascimento;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNascimento(nascimento) {
    if(!Jogador.validarNascimento(nascimento))
      throw new ModelError("Nascimento Inválido: " + nascimento);
    this.#nascimento = nascimento;
  }
  
  //-----------------------------------------------------------------------------------------//

  getJogo() {
    return this.#jogo;
  }
  
  //-----------------------------------------------------------------------------------------//

  setJogo(jogo) {
    if(!Jogador.validarJogo(jogo))
      throw new ModelError("Jogo inválido: " + jogo);
    this.#jogo = jogo;
  }
  
  //-----------------------------------------------------------------------------------------//

  getFuncao() {
    return this.#funcao;
  }
  
  //-----------------------------------------------------------------------------------------//

  setFuncao(funcao) {
    if(!Jogador.validarFuncao(funcao))
      throw new ModelError("Funcao inválido: " + funcao);
    this.#funcao = funcao;
  }
  
  //-----------------------------------------------------------------------------------------//

  toJSON() {
    return '{' +
               '"email" : "'      + this.#email       + '",' +
               '"nome" :  "'      + this.#nome        + '",' +
               '"nascimento" : "' + this.#nascimento  + '",' +
               '"jogo" : "'       + this.#jogo        + '",' +
               '"funcao" : "'     + this.#funcao      + '" ' + 
           '}';  
  }
  
  //-----------------------------------------------------------------------------------------//

  static assign(obj) {
    return new Jogador(obj.email, obj.nome, obj.nascimento, obj.jogo, obj.funcao);
  }

  //-----------------------------------------------------------------------------------------//
  
  static deassign(obj) { 
    return JSON.parse(obj.toJSON());
  }

  //-----------------------------------------------------------------------------------------//

  static validarEmail(email) {
    if(email == null || email == "" || email == undefined)
      return false;

    const padraoEmail = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}/;
    if (!padraoEmail.test(email)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      return false;
    if (nome.length > 40) 
      return false;
    const padraoNome = /[A-Z][a-z] */;
    if (!padraoNome.test(nome)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarNascimento(nascimento) {
    if (nascimento == null || nascimento == "" || nascimento == undefined) 
      return false;
    const padraoNascimento = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if (!padraoNascimento.test(nascimento)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarJogo(jogo) {
    if (jogo == null || jogo == "" || jogo == undefined)
      return false;
    else
      return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarFuncao(funcao) {
    if (funcao == null || funcao == "" || funcao == undefined)
      return false;
    else
      return true;
  }

  //-----------------------------------------------------------------------------------------//
   
  mostrar() {
    let texto = "Email: " + this.email + "\n";
    texto += "Nome: " + this.nome + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}