
export function valideKeyEffort(e) {
    var key = window.Event ? e.which : e.keyCode;
    console.log('Key', e.target.value)
    //console.log(key)
    e.target.backupValueValid = e.target.value;

    if ((key < 48 || key > 57) && (key < 96 || key > 105) && (key < 37 || key > 40) && (key < 8 || key > 9) && (key !== 27) && (key !== 46) && (key !== 16)  ){
        e.preventDefault();
        
    }
}

//&& (key !== 110) && (key !== 190)

export function convertCurrencyToNumber3(stringValue) {
    stringValue = stringValue.trim();
    var result = stringValue.replace(/[^0-9]/g, '');
    if (/[,\.]\d{2}$/.test(stringValue)) {
      result = result.replace(/(\d{2})$/, '.$1');
    }
    return parseFloat(result);
  }