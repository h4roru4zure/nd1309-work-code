//import crypto-js from 'crypto-js';
const SHA256 = require('crypto-js/sha256');

/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block{

    constructor(data){
        this.hash =   ""
        this.height = 0
        this.body =  data
        this.time = 0
        this.previousblockhash = ""
        }
   
}
/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{

    constructor(){
        this.chain=[]
    
        this.chain.push(this.createGenesisBlock())
    }


//generate the block genesis fist one 
    createGenesisBlock(){
        const data = "First block in the chain - Genesis block"
        const block = new Block(data)
        block.hash = SHA256(JSON.stringify(block)).toString()
        //block.height = this.chain.length
        block.height = 0
        block.time = new Date().getTime().toString().slice(0,-3)
        //block.time = new Date().getTime().toString()
        block.previousblockhash = "0x"
        return block;  
    }

//functionality add to array chain

    addChain(newBlock){
        newBlock = { ...newBlock } // Realizar una copia del objeto newBlock
        
        if(this.chain.length >0){
            newBlock.previousblockhash = this.chain[this.chain.length -1].hash
        }

        newBlock.height =   this.chain.length
        //newBlock.time   =   new Date().getTime().toString()
        newBlock.time   =   new Date().getTime().toString().slice(0,-3)
        newBlock.hash   =   SHA256(JSON.stringify(newBlock)).toString()
        this.chain.push(newBlock)
    }

    listChain() {
        return this.chain
    }

    getBlock(hash) {
        const block = this.chain.find(block => block.hash === hash)
        return block;
    }
    getLatestBlock() {
        const lastIndex= this.chain.length -1
        const block=this.chain[lastIndex]
        return block
    }
}

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

//export { simpleChain }

module.exports = {
    Block: Block,
    Blockchain: Blockchain,
    // Otros elementos exportados si los hay
  };
  