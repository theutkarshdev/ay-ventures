export function checkIntersection(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        return true;
      }
    }
    return false;
  }

export function dateToMonths(date){
   
const givenDate = new Date(date);
const currentDate = new Date();
const differenceInMs = currentDate - givenDate;
// Convert milliseconds to months (assuming an average of 30.44 days in a month)
const monthsOld = differenceInMs / (1000 * 60 * 60 * 24 * 30.44);
return Math.floor(monthsOld);
}

export function scoreMatching(score,investor,startup){
    if(startup.investorTypePreference.includes(investor.type)){
        score++
      }
      if(investor.lead_investor_required==startup.anyLeadInvestor){
        score++
      }
     if(checkIntersection(investor.deal_structure,startup.dealStructure)){
      score++
     }
     if(investor.location.country==startup.investorLocationPreference.country){
      score++
  
     }
     if(investor.location.state==startup.investorLocationPreference.state){
      score++
     }
     if(investor.startup_min_revenue<=startup.revenue){
      score++
     }
     if(investor.startup_min_company_age<=dateToMonths(startup.foundingDate)){
      score++
     }
     if(investor.startup_max_valuation_cap>=startup.valuation){
      score++
     }
     if(investor.preference.sc_st_obc===startup.anyOfTheCofounders_sc_st_obc){
      score++
     }
     if(investor.preference.women===startup.anyOfTheCofoundersWoman){
      score++
     }
     return score
}
export function arrayEqualityCheck(arr1, arr2) {
 
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    
    return true;
  
}
export function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !objectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}