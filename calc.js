$(document).ready(function() {

	let currNum = '';
	let prevNum = '';
	let operator = '';
	let result = '';
	let lastEntry = '';
	let twoBack = '';
	let cache = '';
	let oldOp = '';
	let equalFlag = false;
	let doubleEquals = false;


	/**
	 * This function is run when a button on the calculator interface is clicked.
	 * The clicked button is put in one of three broad categories: number button, operator button, or clear button.
	 * Each category calls a different function when its button is clicked. 
	 */
    $('button').on('click', function(evt) {
    	twoBack = lastEntry;
    	lastEntry = evt.target.innerHTML
    	console.log(lastEntry);
    	if(isNumber(lastEntry)){
    		var temp = lastEntry;
    		if(twoBack == '='){
    			clearAll();
    			lastEntry = temp;
    		}
    		numberClicked(lastEntry);
    	}else if(lastEntry == 'C'){
    		clearAll();
    	}else{
    		if(lastEntry == '=' && twoBack == '='){
    			doubleEquals = true;
    			currNum = cache;
    			operator = oldOp;
    		} else{
    			doubleEquals = false;
    		}
    		if(lastEntry == '=' && prevNum == '' && equalFlag == false){
    			lastEntry = twoBack;
    		} else if(lastEntry == '=' && prevNum != '' && currNum == '' && equalFlag == false){
    			lastEntry = twoBack;
    		} else{
    			operatorClicked(lastEntry); 
    		}
    	}
    });

    /**
     * This function concatenates the num argument to the currNum 
     * and displays the result to the calculator's display field. 
     * @param {string} num The num to be concatenated to currNum.
     */
    function numberClicked(num){
    	currNum += num;
    	displayNumber(currNum);
    	
    }

	/**
     * This function assigns the op argument to operator if argument is empty.
     * Otherwise, the equalsClicked function is called.  
     * @param {string} op The operator to be assigned to the operator variable
     */    
    function operatorClicked(op){
    	if(op == '='){
    		equalFlag = true;
    	}
    	if(operator === ''){
    		operator = op;
    		if(equalFlag == false){
	    		prevNum = currNum;
	      		currNum = '';
      		} 
    	} else{
    		equalsClicked(op);
    	}
    }


    /**
     * This function performs operations on currNum and prevNum. 
     * @param {string} op The new operator to be assigned to the operator variable
     * after the operation is performed.
     */    
    function equalsClicked(op){
    	if(operator == '+'){
    		result = +currNum + +prevNum;
    		displayNumber(result);
    	} else if(operator == '-'){
    		result = +prevNum - +currNum;
    		displayNumber(result);
    	} else if(operator == '*'){
    		result = +currNum * +prevNum;
    		displayNumber(result);
    	} else if(operator == '\/'){
    		result = (+prevNum) / (+currNum);
    		displayNumber(result);
    	}
    	prevNum = result;
    	if(operator != '=') oldOp = operator;
    	cache = currNum;
    	currNum = '';
    	if(equalFlag && !doubleEquals) operator = '';
    	else if(!doubleEquals) operator = op;
    }

    /**
     * This function displays the but argument to the calculator's display.
     * @param {string} but The number to be displayed.
     */  
    function displayNumber(but){
    	$('#display').val(but);
    	console.log(but);
    }

    /**
     * This function resets all variables when the clear button is clicked. 
     */  
    function clearAll(){
    	currNum = '';
		prevNum = '';
		operator = '';
		result = '';
		lastEntry = '';
		cache = '';
		oldOp = '';
		equalFlag = false;
		doubleEquals = false;
		displayNumber('');
    }

    /**
     * This function determines if the num argument is a number
     * @param {string} num The number to be investigated. 
     */ 
    function isNumber(num){
    	if(num >= '0' && num <= '9') return true;
    	else return false;
    }

});