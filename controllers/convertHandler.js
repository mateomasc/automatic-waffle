function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    // Buscar el índice donde empieza la unidad (primera letra)
    let numString = input.match(/[a-zA-Z]/);
    if (numString) {
      numString = input.slice(0, input.indexOf(numString[0]));
    } else {
      numString = input;
    }
    
    // Si no hay número, retornar 1 por defecto
    if (numString === '') {
      return 1;
    }
    
    // Verificar si hay doble fracción (más de una barra)
    let slashCount = (numString.match(/\//g) || []).length;
    if (slashCount > 1) {
      return 'invalid number';
    }
    
    // Si hay fracción, evaluarla
    if (slashCount === 1) {
      let parts = numString.split('/');
      let numerator = parseFloat(parts[0]);
      let denominator = parseFloat(parts[1]);
      
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      
      result = numerator / denominator;
    } else {
      // Número decimal o entero
      result = parseFloat(numString);
      
      if (isNaN(result)) {
        return 'invalid number';
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    // Buscar la unidad (últimas letras del input)
    let unitMatch = input.match(/[a-zA-Z]+$/);
    
    if (!unitMatch) {
      return 'invalid unit';
    }
    
    let unit = unitMatch[0].toLowerCase();
    
    // Validar unidades aceptadas
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      // Retornar 'L' en mayúscula para litros, el resto en minúscula
      result = unit === 'l' ? 'L' : unit;
    } else {
      return 'invalid unit';
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    result = unitMap[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    result = unitNames[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }
    
    // Redondear a 5 decimales
    result = Math.round(result * 100000) / 100000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    
    result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
