"use strict";

import ModelError from "/ModelError.js";
import Jogador from "/Jogador.js";

export default class DaoJogador {
  
  //-----------------------------------------------------------------------------------------//

  static conexao = null;

  constructor() {
    this.arrayJogadores = [];
    this.obterConexao();
  }

  //-----------------------------------------------------------------------------------------//
  
  /*
   *  Devolve uma Promise com a referência para o BD
   */ 
  async obterConexao() {
    if(DaoJogador.conexao == null) {
      DaoJogador.conexao = new Promise(function(resolve, reject) {
        let requestDB = window.indexedDB.open("JogadorDB", 1); 

        requestDB.onupgradeneeded = (event) => {
          let db = event.target.result;
          let store = db.createObjectStore("JogadorST", {
            autoIncrement: true
          });
          store.createIndex("idxEmail", "email", { unique: true });
        };

        requestDB.onerror = event => {
          reject(new ModelError("Erro: " + event.target.errorCode));
        };

        requestDB.onsuccess = event => {
          if (event.target.result) {
            // event.target.result apontará para IDBDatabase aberto
            resolve(event.target.result);
          }
          else 
            reject(new ModelError("Erro: " + event.target.errorCode));
        };
      });
    }
    return await DaoJogador.conexao;
  }
  
  //-----------------------------------------------------------------------------------------//

  async obterJogadores() {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      let indice;
      try {
        transacao = connection.transaction(["JogadorST"], "readonly");
        store = transacao.objectStore("JogadorST");
        indice = store.index('idxEmail');
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }
      let array = [];
      indice.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {        
          const novo = Jogador.assign(cursor.value);
          array.push(novo);
          cursor.continue();
        } else {
          resolve(array);
        }
      };
    });
    this.arrayJogadores = await promessa;
    return this.arrayJogadores;
  }

  //-----------------------------------------------------------------------------------------//

  async obterJogadorPeloEmail(email) {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      let indice;
      try {
        transacao = connection.transaction(["JogadorST"], "readonly");
        store = transacao.objectStore("JogadorST");
        indice = store.index('idxEmail');
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }

      let consulta = indice.get(email);
      consulta.onsuccess = function(event) { 
        if(consulta.result != null)
          resolve(Jogador.assign(consulta.result)); 
        else
          resolve(null);
      };
      consulta.onerror = function(event) { reject(null); };
    });
    let jogador = await promessa;
    return jogador;
  }

  //-----------------------------------------------------------------------------------------//

  async obterJogadoresPeloAutoIncrement() {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      try {
        transacao = connection.transaction(["JogadorST"], "readonly");
        store = transacao.objectStore("JogadorST");
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }
      let array = [];
      store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {        
          const novo = Jogador.assign(cursor.value);
          array.push(novo);
          cursor.continue();
        } else {
          resolve(array);
        }
      };
    });
    this.arrayJogadores = await promessa;
    return this.arrayJogadores;
  }

  //-----------------------------------------------------------------------------------------//

  async incluir(jogador) {
    let connection = await this.obterConexao();      
    let resultado = new Promise( (resolve, reject) => {
      let transacao = connection.transaction(["JogadorST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível incluir o jogador", event.target.error));
      };
      let store = transacao.objectStore("JogadorST");
      let requisicao = store.add(Jogador.deassign(jogador));
      requisicao.onsuccess = function(event) {
          resolve(true);              
      };
    });
    return await resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async alterar(jogador) {
    let connection = await this.obterConexao();      
    let resultado = new Promise(function(resolve, reject) {
      let transacao = connection.transaction(["JogadorST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível alterar o jogador", event.target.error));
      };
      let store = transacao.objectStore("JogadorST");     
      let indice = store.index('idxEmail');
      var keyValue = IDBKeyRange.only(jogador.getEmail());
      indice.openCursor(keyValue).onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.email == jogador.getEmail()) {
            const request = cursor.update(Jogador.deassign(jogador));
            request.onsuccess = () => {
              console.log("[DaoJogador.alterar] Cursor update - Sucesso ");
              resolve("Ok");
              return;
            };
          } 
        } else {
          reject(new ModelError("Jogador com a matrícula " + jogador.getEmail() + " não encontrado!",""));
        }
      };
    });
    return await resultado;
  }
  
  //-----------------------------------------------------------------------------------------//

  async excluir(jogador) {
    let connection = await this.obterConexao();      
    let transacao = await new Promise(function(resolve, reject) {
      let transacao = connection.transaction(["JogadorST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível excluir o jogador", event.target.error));
      };
      let store = transacao.objectStore("JogadorST");
      let indice = store.index('idxEmail');
      var keyValue = IDBKeyRange.only(jogador.getEmail());
      indice.openCursor(keyValue).onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.email == jogador.getEmail()) {
            const request = cursor.delete();
            request.onsuccess = () => { 
              resolve("Ok"); 
            };
            return;
          }
        } else {
          reject(new ModelError("Jogador com a email " + jogador.getEmail() + " não encontrado!",""));
        }
      };
    });
    return false;
  }

  //-----------------------------------------------------------------------------------------//
}
