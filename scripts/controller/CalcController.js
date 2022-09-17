class CalcController {
    constructor(){
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation =[];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._DateEl = document.querySelector("#data");
        this._TimeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this. initButtonsEvents();
        this.initKeyboard()
        this._audioOnOff = false
        this._audio = new Audio ('click.mp3')

    }

    copyToClipboard(){

        let input = document.createElement('input')

        input.value = this.displayCalc

        document.body.appendChild(input)

        input.select()

        document.execCommand("Copy")
        
        input.remove()

    }

      pasteFromClipboard(){

         document.addEventListener('paste', e =>{

            let text = e.clipboardData.getData('text')

            this.displayCalc = parseFloat(text)
         })
      }
      
    initialize(){

       this.setLastNumberToDisplay();



     this.setdisplayDateTime();
     
     
     setInterval(() => {

        this.setdisplayDateTime();
     },1000);

     this.setLastNumberToDisplay()
     this.pasteFromClipboard()

     document.querySelectorAll('btn-ac').forEach(btn=>{
          
        btn.addEventListener('dbclick', e=> {

            this.toggleAudio()
        })
     })

    }

    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;

    }

    playAudio(){

        if (this._audioOnOff){
            this._audio.currentTime = 0;

            this._audio.play()

        }
    }

    initKeyboard() {

        document.addEventListener('keyup', e=> {

            this.playAudio();


            switch (e.key){
                case 'Escape':
                    this.clearAll();
                    break;
    
                    case 'Backspace':
                        this.clearEntry();
                        break;
    
                        case '+':
                        case '-':
                        case '*':
                        case '/':
                        case '%':
                            this.addOperation(e.key);
                            break;
         
                                            
                                            case 'Enter':
                                                case '=':
                                                this.calc();
                                                break;

                                                case '.':
                                                    case ',':
                                                    this.addDot();    
                                                break;
    
                                                 case '0':
                                                 case '1':
                                                 case '2':
                                                 case '3':
                                                 case '4':
                                                 case '5':
                                                 case '6':
                                                 case '7':
                                                 case '8':
                                                 case '9':
    
                                                 this.addOperation(parseInt(e.key));
                                                    
                                                 break;


                             case 'c':
                                if(e.ctrlKey)this.copyToClipboard()
                                break                    
                                   
                                    
            }
        })

    


    }


    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
                element.addEventListener(event, fn, false);
        });

    }



    clearAll(){

        this._operation = [];
        this._lastNumber = ''
        this.lastOperation = ''
        this.setLastNumberToDisplay();


    }
    clearEntry(){
   
        this._operation.pop();
        this.setLastNumberToDisplay();

    }

    getLastOperation(){

        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){
        return (['+','-' ,'*' ,'%', '/'].indexOf(value) > /*que*/ -1);
    }

    pushOperation(value){

        this._operation.push(value)
        if (this._operation.length > 3) {

            this.calc();

            console.log(this._operation);
        }
    }

    getResult(){

        try{
        return eval(this._operation.join(""));
    } catch(e){
        setTimeout(() => {
            this.setError()
            
        }, 1)
        
    }
    }


    

    calc(){

       let last = '';

       this._lastOperator = this.getLastItem();

       if (this._operation.length < 3 ){
            
           let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
         
       }

        if (this._operation.length > 3){

            last = this._operation.pop();
         this._lastNumber = this.getResult();

        }else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        console.log('_lastOperator', this._lastOperator);
        console.log('_lastNumber', this._lastNumber);
;
       
        let result = this.getResult();
        
        if (last == "%") {

            result /= 100;

            this._operation = [result];

        }else {

            this._operation = [result];
             
            if (last)this._operation.push(last);

        }

         this.setLastNumberToDisplay();

    }

    getLastItem(isOperator= true){

        let LastItem;

        for  (let i = this._operation.length-1; i >= 0;  i --){

            if (this.isOperator(this._operation[i]) == isOperator){
                LastItem = this._operation[i];
                break;
            }
        
    }

    if(!LastItem){

        LastItem = (isOperator) ? this._lastOperator : this._lastNumber;


    }

    return LastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (!lastNumber)lastNumber = 0;
          
        this.displayCalc = lastNumber;
    }

    addOperation(value){

       
          
        if(isNaN(this.getLastOperation())){
          
            if(this.isOperator(value)){

                this.setLastOperation(value);

            } else {

                  this.pushOperation(value);

                  this.setLastNumberToDisplay();
            }
        }else {
              
              if (this.isOperator(value)){

                this.pushOperation(value);

              }else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

               this.setLastNumberToDisplay();

              }
        }
        {
          
        }

       
    }

    setError(){
        this.displayCalc = "error"
    }
    addDot(){
          
        let lastOperation = this.getLastOperation();
                       //&& 'ela existe'
        if (typeof lastOperation ==='string' && lastOperation.split('').indexOf('.') > -1) return

       if (                          //uma || ou outra//
        this.isOperator(lastOperation) || !lastOperation){
        this.pushOperation('0.');
    } else {
        this.setLastOperation(lastOperation.toString() + '.');
    } this.setLastNumberToDisplay()

}


    execBtn(value){
          //para iniciar o audio
        this.playAudio()

        switch (value){
            case 'ac':
                this.clearAll();
                break;

                case 'ce':
                    this.clearEntry();
                    break;

                    case 'soma':
                        this.addOperation('+');
                        break;

                        case 'subtracao':
                            this.addOperation('-');
                           
                            break;
                            case 'divisao':
                                this.addOperation('/');
                                break;

                                case 'multiplicacao':
                                    this.addOperation('*');
                                    break;
                                    case 'porcento':
                                        this.addOperation('%');
                                        
                                        break;
                                        case 'igual':
                                            this.calc();
                                            
                                            
                                            break;

                                             case '0':
                                             case '1':
                                             case '2':
                                             case '3':
                                             case '4':
                                             case '5':
                                             case '6':
                                             case '7':
                                             case '8':
                                             case '9':

                                             this.addOperation(parseInt(value));
                                                
                                             break;
                                case 'ponto':
                                    this.addDot();
                                    
                                break;


                                    default:
                                        this.setError();
                                        break;        
                                           
        }
    }

    /*listener(ouvinte)*/        
                     /*nomes dos meu eventos-click drag*/
                     /*funçao-e=>*/
                      /*elemento-btn/*  */

    initButtonsEvents(){
    /*let(deixar)*/
       let buttons = document.querySelectorAll("#buttons > g, #parte > g");
      /*forEach(para cada)=percorrer o button que ele encrontrar.*/
      /*btn=adiciona o evento > atraçao principal */
       buttons.forEach((btn, index)=>{
                         
      this.addEventListenerAll(btn, "click drag ", e => {
                                   /*retirar o btn e nao colocar nada*/
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);       
      });

      this.addEventListenerAll(btn,"mouseover  mouseup mousedown", e => {
        btn.style.curso ="pointer";
      });

       });

    }
   
       
    

    setdisplayDateTime(){

        this.displyDate = this.currentDate.toLocaleDateString(this._locale);

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    get displayTime(){
     
     return this._TimeEl.innerHTML;

    }

    set displayTime (value){
        return this._TimeEl.innerHTML = value;

    }
    get displyDate(){
        return this._DateEl.innerHTML;

    }

    set displyDate(value){
        return this._DateEl.innerHTML = value;
    }


    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){

        if (value.toString().length > 10) {
            this.setError()
            return false;
        }

        this._displayCalcEl.innerHTML = value ;
        
    }
    get currentDate(){

        return  new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
    
}