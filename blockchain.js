const Block=require('./block')
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()]
         this.difficulty=4
    }
    createGenesisBlock(){
        const genesisDate='18/04/1999'
        return new Block('Genesis Block', 0, genesisDate, '0')
    }
    getLastBlock(){
        return this.chain[this.chain.length-1]
    }

    addNewBlock(newBlock){
        newBlock.previousHash=this.getLastBlock().hash
        newBlock.index=this.getLastBlock().index+1
        newBlock.hash=newBlock.calculateHash()
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }
    isChainValid(){
        const chain=this.chain
        for(let i=0; i<chain.length; i++){
            if(chain[i].hash !== chain[i].calculateHash()){
                console.log(`Block ${i} has been messed with`)
                return false
            }

            if(i>0 && chain[i].previousHash!== chain[i-1].hash){
                console.log(`Block ${i} has been messed with`)
                return false
            }
        }
        console.log(`Block ${i} is valid`)
                return true
    }
}

let blockToAdd=5

const polychain=new Blockchain()
for(i=0; i<blockToAdd; i++){
    polychain.addNewBlock(new Block({sender:'polycode', receiver:'youtube', message:`Block ${polychain.chain.length} has been added to the chain`}))
}

// console.log(polychain.isChainValid())

polychain.chain[3].data={sender:'Polycode', receiver:'Youtube',message:'This block has been tampered with'}
polychain.chain.forEach((block)=>{
    console.log(block)
    console.log()
    // console.log(block.calculateHash())
})

// console.log(polychain.isChainValid())