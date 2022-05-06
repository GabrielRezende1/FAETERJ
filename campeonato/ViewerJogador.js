import Status from "/Status.js";
import Jogador from "/Jogador.js";
import ViewerError from "/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerJogador {

  #ctrl;
  
  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar  = this.obterElemento('divNavegar'); 
    this.divComandos = this.obterElemento('divComandos'); 
    this.divAviso    = this.obterElemento('divAviso'); 
    this.divDialogo  = this.obterElemento('divDialogo');

    this.btPrimeiro  = this.obterElemento('btPrimeiro');
    this.btAnterior  = this.obterElemento('btAnterior');
    this.btProximo   = this.obterElemento('btProximo');
    this.btUltimo    = this.obterElemento('btUltimo');

    this.btIncluir   = this.obterElemento('btIncluir');
    this.btExcluir   = this.obterElemento('btExcluir');
    this.btAlterar   = this.obterElemento('btAlterar');
    this.btSair      = this.obterElemento('btSair');

    this.btOk        = this.obterElemento('btOk');
    this.btCancelar  = this.obterElemento('btCancelar');

    this.tfEmail      = this.obterElemento('tfEmail');
    this.tfNome       = this.obterElemento('tfNome');
    this.tfNascimento = this.obterElemento('tfNascimento');
    this.cbJogo       = this.obterElemento('cbJogo');
    this.cbFuncao     = this.obterElemento('cbFuncao');
      
    this.btPrimeiro.onclick = fnBtPrimeiro; 
    this.btProximo.onclick = fnBtProximo; 
    this.btAnterior.onclick = fnBtAnterior; 
    this.btUltimo.onclick = fnBtUltimo; 

    this.btIncluir.onclick = fnBtIncluir; 
    this.btAlterar.onclick = fnBtAlterar; 
    this.btExcluir.onclick = fnBtExcluir; 

    this.cbJogo.onchange = fnCbJogo;
    this.cbFuncao.onchange = fnCbFuncao;

    this.btOk.onclick = fnBtOk; 
    this.btCancelar.onclick = fnBtCancelar; 
  }

//------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if(elemento == null) 
      throw new ViewerError("Não encontrei um elemento com id '" + idElemento + "'");
    // Adicionando o atributo 'viewer' no elemento do Viewer. Isso permitirá
    // que o elemento guarde a referência para o objeto Viewer que o contém.
    elemento.viewer = this;
    return elemento;
  }

//------------------------------------------------------------------------//
  
  getCtrl() { 
    return this.#ctrl;
  }

//------------------------------------------------------------------------//
  
  apresentar(pos, qtde, jogador) {    
    
    this.configurarNavegacao( pos <= 1 , pos == qtde );   

    if(jogador == null) {
      this.tfEmail.value      = "";
      this.tfNome.value       = "";
      this.tfNascimento.value = "";
      this.cbJogo.value       = "";
      this.cbFuncao.value     = "";
      this.divAviso.innerHTML = " Número de Jogadores: 0";
    } else {
      this.tfEmail.value      = jogador.getEmail();
      this.tfNome.value       = jogador.getNome();
      this.tfNascimento.value = jogador.getNascimento();
      this.cbJogo.value       = jogador.getJogo();
      this.cbFuncao.value     = jogador.getFuncao();
      this.divAviso.innerHTML = "Posição: " + pos + " | Número de Jogadores: " + qtde;
    }
  }

//------------------------------------------------------------------------//

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled   = flagFim;
    this.btProximo.disabled  = flagFim;
    this.btAnterior.disabled = flagInicio;
  }
  
//------------------------------------------------------------------------//
  
  statusEdicao(operacao) { 
    this.divNavegar.hidden  = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden  = false; 
    
    if(operacao != Status.EXCLUINDO) {
      this.tfNome.disabled        = false;
      this.tfNascimento.disabled  = false;
      this.cbJogo.disabled        = false;
      this.cbFuncao.disabled      = false;
      this.divAviso.innerHTML     = "";      
    } else {
      this.divAviso.innerHTML     = "Deseja excluir este registro?";      
    }
    if(operacao == Status.INCLUINDO) {
      this.tfEmail.disabled     = false;
      this.tfEmail.value        = "";
      this.tfNome.value         = "";
      this.tfNascimento.value   = "";
      this.cbJogo.value         = "";
      this.cbFuncao.value       = "";
    }
  }

//------------------------------------------------------------------------//
  
  statusApresentacao() { 
    this.tfNome.disabled = true;
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true; 
    this.tfEmail.disabled = true;
    this.tfNome.disabled = true;
    this.tfNascimento.disabled = true;
    this.cbJogo.disabled = true;
    this.cbFuncao.disabled = true;
  }

}

//------------------------------------------------------------------------//
// CALLBACKs para os Botões
//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarPrimeiro();
  
}

//------------------------------------------------------------------------//

function fnBtProximo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarProximo();
  
}

//------------------------------------------------------------------------//

function fnBtAnterior() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarAnterior();
  
}

//------------------------------------------------------------------------//

function fnBtUltimo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarUltimo();
  
}
//------------------------------------------------------------------------//

function fnBtIncluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarIncluir();
}

//------------------------------------------------------------------------//

function fnBtAlterar() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarAlterar();
  
  if (this.viewer.cbJogo.value == "LoL") {
    this.viewer.cbFuncao.options.length = 0; //Limpo todas as opções da seleção
    let op1 = document.createElement("option"); //crio o elemento da seleção
    let op2 = document.createElement("option");
    let op3 = document.createElement("option");
    let op4 = document.createElement("option");
    let op5 = document.createElement("option");
    op1.value = "top"; //especifico o valor
    op2.value = "mid";
    op3.value = "adc";
    op4.value = "sup";
    op5.value = "jg";
    op1.text = "TOP"; //especifico o texto
    op2.text = "MID";
    op3.text = "ADC";
    op4.text = "SUP";
    op5.text = "JG";
    this.viewer.cbFuncao.add(op1); //adiciono a opção na seleção
    this.viewer.cbFuncao.add(op2);
    this.viewer.cbFuncao.add(op3);
    this.viewer.cbFuncao.add(op4);
    this.viewer.cbFuncao.add(op5);
  }else if (this.viewer.cbJogo.value == "CSGO") {
    this.viewer.cbFuncao.options.length = 0; //Limpo todas as opções da seleção
    let op1 = document.createElement("option"); //crio o elemento da seleção
    let op2 = document.createElement("option");
    let op3 = document.createElement("option");
    let op4 = document.createElement("option");
    let op5 = document.createElement("option");
    op1.value = "fragger"; //especifico o valor
    op2.value = "support";
    op3.value = "leader";
    op4.value = "awper";
    op5.value = "lurker";
    op1.text = "Fragger"; //especifico o texto
    op2.text = "Support";
    op3.text = "Leader";
    op4.text = "Awper";
    op5.text = "Lurker";
    this.viewer.cbFuncao.add(op1); //adiciono a opção na seleção
    this.viewer.cbFuncao.add(op2);
    this.viewer.cbFuncao.add(op3);
    this.viewer.cbFuncao.add(op4);
    this.viewer.cbFuncao.add(op5);
  }
}

//------------------------------------------------------------------------//

function fnBtExcluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarExcluir();
}

//------------------------------------------------------------------------//

function fnBtOk() {
  const email       = this.viewer.tfEmail.value;
  const nome        = this.viewer.tfNome.value;
  const nascimento  = this.viewer.tfNascimento.value;
  const jogo        = this.viewer.cbJogo.value;
  const funcao      = this.viewer.cbFuncao.value;
    
  // Como defini que o método "efetivar" é um dos métodos incluir, excluir ou alterar
  // não estou precisando colocar os ninhos de IF abaixo.
  this.viewer.getCtrl().efetivar(email, nome, nascimento, jogo, funcao); 

  // if(this.viewer.getCtrl().getStatus() == Status.INCLUINDO) {
  //  this.viewer.getCtrl().fnEfetivar(email, nome, nascimento, jogo, funcao); 
  //} else if(this.viewer.getCtrl().getStatus() == Status.ALTERANDO) {
  //  this.viewer.getCtrl().alterar(email, nome, nascimento, jogo, funcao); 
  //} else if(this.viewer.getCtrl().getStatus() == Status.EXCLUINDO) {
  //  this.viewer.getCtrl().excluir(email, nome, nascimento, jogo, funcao); 
  //}

  // O código abaixo não funciona caso eu coloque numa função e a chame
  this.viewer.cbFuncao.options.length = 0; //Limpo todas as opções da seleção
  let op1 = document.createElement("option"); //crio o elemento da seleção
  let op2 = document.createElement("option");
  let op3 = document.createElement("option");
  let op4 = document.createElement("option");
  let op5 = document.createElement("option");
  let op6 = document.createElement("option");
  let op7 = document.createElement("option");
  let op8 = document.createElement("option");
  let op9 = document.createElement("option");
  let op10 = document.createElement("option");
  op1.value = "top"; //especifico o valor
  op2.value = "mid";
  op3.value = "adc";
  op4.value = "sup";
  op5.value = "jg";
  op6.value = "fragger";
  op7.value = "support";
  op8.value = "leader";
  op9.value = "awper";
  op10.value = "lurker";
  op1.text = "TOP"; //especifico o texto
  op2.text = "MID";
  op3.text = "ADC";
  op4.text = "SUP";
  op5.text = "JG";
  op6.text = "Fragger"; //especifico o texto
  op7.text = "Support";
  op8.text = "Leader";
  op9.text = "Awper";
  op10.text = "Lurker";
  this.viewer.cbFuncao.add(op1); //adiciono a opção na seleção
  this.viewer.cbFuncao.add(op2);
  this.viewer.cbFuncao.add(op3);
  this.viewer.cbFuncao.add(op4);
  this.viewer.cbFuncao.add(op5);
  this.viewer.cbFuncao.add(op6);
  this.viewer.cbFuncao.add(op7);
  this.viewer.cbFuncao.add(op8);
  this.viewer.cbFuncao.add(op9);
  this.viewer.cbFuncao.add(op10);
}

//------------------------------------------------------------------------//

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar(); 

  // O código abaixo não funciona caso eu coloque numa função e a chame
  this.viewer.cbFuncao.options.length = 0; //Limpo todas as opções da seleção
  let op1 = document.createElement("option"); //crio o elemento da seleção
  let op2 = document.createElement("option");
  let op3 = document.createElement("option");
  let op4 = document.createElement("option");
  let op5 = document.createElement("option");
  let op6 = document.createElement("option");
  let op7 = document.createElement("option");
  let op8 = document.createElement("option");
  let op9 = document.createElement("option");
  let op10 = document.createElement("option");
  op1.value = "top"; //especifico o valor
  op2.value = "mid";
  op3.value = "adc";
  op4.value = "sup";
  op5.value = "jg";
  op6.value = "fragger";
  op7.value = "support";
  op8.value = "leader";
  op9.value = "awper";
  op10.value = "lurker";
  op1.text = "TOP"; //especifico o texto
  op2.text = "MID";
  op3.text = "ADC";
  op4.text = "SUP";
  op5.text = "JG";
  op6.text = "Fragger"; //especifico o texto
  op7.text = "Support";
  op8.text = "Leader";
  op9.text = "Awper";
  op10.text = "Lurker";
  this.viewer.cbFuncao.add(op1); //adiciono a opção na seleção
  this.viewer.cbFuncao.add(op2);
  this.viewer.cbFuncao.add(op3);
  this.viewer.cbFuncao.add(op4);
  this.viewer.cbFuncao.add(op5);
  this.viewer.cbFuncao.add(op6);
  this.viewer.cbFuncao.add(op7);
  this.viewer.cbFuncao.add(op8);
  this.viewer.cbFuncao.add(op9);
  this.viewer.cbFuncao.add(op10);
}

//------------------------------------------------------------------------//

function fnCbJogo() {
  if (this.viewer.cbJogo.value == "LoL") {
    this.viewer.cbFuncao.options.length = 0; //Limpo todas as opções da seleção
    let op1 = document.createElement("option"); //crio o elemento da seleção
    let op2 = document.createElement("option");
    let op3 = document.createElement("option");
    let op4 = document.createElement("option");
    let op5 = document.createElement("option");
    op1.value = "top"; //especifico o valor
    op2.value = "mid";
    op3.value = "adc";
    op4.value = "sup";
    op5.value = "jg";
    op1.text = "TOP"; //especifico o texto
    op2.text = "MID";
    op3.text = "ADC";
    op4.text = "SUP";
    op5.text = "JG";
    this.viewer.cbFuncao.add(op1); //adiciono a opção na seleção
    this.viewer.cbFuncao.add(op2);
    this.viewer.cbFuncao.add(op3);
    this.viewer.cbFuncao.add(op4);
    this.viewer.cbFuncao.add(op5);
  }else if (this.viewer.cbJogo.value == "CSGO") {
    this.viewer.cbFuncao.options.length = 0; //Limpo todas as opções da seleção
    let op1 = document.createElement("option"); //crio o elemento da seleção
    let op2 = document.createElement("option");
    let op3 = document.createElement("option");
    let op4 = document.createElement("option");
    let op5 = document.createElement("option");
    op1.value = "fragger"; //especifico o valor
    op2.value = "support";
    op3.value = "leader";
    op4.value = "awper";
    op5.value = "lurker";
    op1.text = "Fragger"; //especifico o texto
    op2.text = "Support";
    op3.text = "Leader";
    op4.text = "Awper";
    op5.text = "Lurker";
    this.viewer.cbFuncao.add(op1); //adiciono a opção na seleção
    this.viewer.cbFuncao.add(op2);
    this.viewer.cbFuncao.add(op3);
    this.viewer.cbFuncao.add(op4);
    this.viewer.cbFuncao.add(op5);
  }
}

//------------------------------------------------------------------------//

function fnCbFuncao() {

}