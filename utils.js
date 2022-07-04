
// 오픈소스입니다! MIT 라이선스 적용

const identical = x => x; // 항등함수

const GENERAL_OPERATORS = [ // 일반 이항 연산
	'add', 'backAdd', 'sub', 'backSub', 'mul', 'backMul', 'div', 'backDiv', // 사칙 연산
	'padd', 'backPadd', 'psub', 'backPsub', 'pmul', 'backPmul', 'pdiv', 'backPdiv', // 정밀 보정 사칙 연산
	'divLim0', 'divLim1', 'divLimInf', 'backDivLim0', 'backDivLim1', 'backDivLimInf', // 0/0 극한값 나눗셈 연산
	'idiv', 'backIdiv', 'mod', 'backMod', 'dm',
	'pow', 'backPow', 'powLim0', 'backPowLim0', 'powLim1', 'backPowLim1', 'logBase', 'backLogBase',
	'bitwiseAnd', 'bitwiseOr', 'bitwiseXor',
	'bitwiseLsh', 'backBitwiseLsh', 'bitwiseRsh', 'backBitwiseRsh', 'bitwiseUrsh', 'backBitwiseUrsh',
	'lcm', 'gcd', 'least', 'greatest', 'compare', '_citrans',
	'center', 'gcenter', 'hcenter', 'abSub', 'sqSub', 'hAbSub', 'delta', 'atan2', 'hypot', 'root', 'backRoot',
	'fractionRound', 'fractionCeil', 'fractionFloor', 'fractionTrunc',
	'factorRound', 'factorCeil', 'factorFloor', 'factorTrunc',
	'digitRound', 'digitCeil', 'digitFloor', 'digitTrunc',
	'sadd', 'backSadd', 'ssub', 'backSsub', 'smul', 'backSmul', 'sdiv', 'backSdiv', 'smod', 'backSmod', /*'sfmt',*/
	'slsh', 'backSlsh', 'srsh', 'backSrsh',
	'pack2', 'backPack2', 'toXY', 'toPolar', 'naValue',
	'baseString',
];

const LOGICAL_OPERATORS = [
	'and', 'or', 'xor', 'backAnd', 'backOr', 'backXor',
];

const BINARY_COMPARE_OPERATORS = [ // 비교 연산 (별칭까지 포함하여 작성) boolean으로 반환하므로 따로 표기
	'less', 'leq', 'greater', 'geq', 
	'equal', 'notEqual', 'identical', 'notIdentical',
	'coprime', 'similar', 'notSimilar',
	//'equalObject', 'notEqualObject', 'identicalObject', 'notIdenticalObject',
];

const UNARY_GENERAL_OPERATORS = [ // 단항 연산
	'plus', 'minus', 'reciproc', 'abs', 'bitwiseNot', 'not',
	'round', 'ceil', 'floor', 'trunc', 'boolean', 'modf', 'precise',
	'exp','expm1','log','log10','log1p','pow10','square','cube','sqrt','cbrt','sign',
	'sin','cos','tan','csc','sec','cot',
	'asin','acos','atan','acsc','asec','acot',
	'sinh','cosh','tanh','asinh','acosh','atanh',
	'toRadians','toDegrees','count','validCount','strLen',
	'splus', 'sminus', 'sreciproc',
	'asFraction', 'NaNtoNA',
	'pack1', 'divisors',  'percent', 'permil', 'unpercent', 'unpermil','this',
	'toLowerCase', 'toUpperCase',
	'hex', 'uhex', 'oct', 'bin',
	'hexToNumber', 'octToNumber', 'binToNumber', 'decToNumber',
	'byteCut', 'shortCut', 'intCut',
];

const UNARY_CHECK_OPERATORS = [
	'isOdd', 'isEven', 'isPrime', 'isPositive', 'isNegative', 'isZero', 'isNaN', 'isFinite',
];

const TERNARY_GENERAL_OPERATORS = [
	'fitInRange', 'packs', 'combined', 'fusion', 'transform', 'transCurve', 'transPower', 'transLog', 'transExp', 'alphaAdd',
];

const TERNARY_COMPARE_OPERATORS = [
	'inRange',
];

const OBJECT_COMPARE_OPERATORS = [
	'similarObject', 'notSimilarObject',
	'equalObject', 'notEqualObject',
	'identicalObject', 'notIdenticalObject',
	'booleanObject'
];


const ARRAY_STATISTICAL_OPERATORS = [
	'sum', 'mean', 'var', 'stdev', 'prod', 'min', 'max', 'powerMean',
	'cardinality',
];

const ARRAY_UNARY_OPERATORS = [
	'sum', 'mean', 'var', 'stdev', 'prod', 'min', 'max', 
	'aplus', 'aminus',
	'ascSort', 'descSort', 'ascSortByDict', 'descSortByDict', 'pop', 'shift', 'getTag','wrap',
	'lookup',
];

const ARRAY_BINARY_OPERATORS = [
	'aadd', 'asub', 'amul', 'amod', 'alsh', 'arsh',
	'aand', 'aor', 'axor', //'afmt',
	'equalEachObject', 'notEqualEachObject',
	'identicalEachObject', 'notIdenticalEachObject',
	'at', 'unshift', 'push', 'setTag', 'insert',
	'sumprod',
];

const ARRAY_TERNARY_OPERATORS = ['powerMean','slice','splice','accum','near','comb'];

const ARRAY_OPERATORS = [
	...ARRAY_UNARY_OPERATORS, ...ARRAY_BINARY_OPERATORS, ...ARRAY_TERNARY_OPERATORS
	//'subset', 'supset', 'realSubset', 'realSupset', 'supsub', 'notSupsub', 'disjoint', 'notDisjoint',
];


const UNARY_OPERATORS = [...UNARY_GENERAL_OPERATORS,...UNARY_CHECK_OPERATORS];
const BINARY_OPERATORS = [...GENERAL_OPERATORS, ...LOGICAL_OPERATORS, ...BINARY_COMPARE_OPERATORS];
const TERNARY_OPERATORS = [...TERNARY_COMPARE_OPERATORS, ...TERNARY_GENERAL_OPERATORS];
const ALL_OPERATORS = [...BINARY_OPERATORS, ...UNARY_OPERATORS, ...TERNARY_OPERATORS, ...OBJECT_COMPARE_OPERATORS, ...ARRAY_OPERATORS];

const COMPARE_OPERATORS = [...BINARY_COMPARE_OPERATORS, ...TERNARY_COMPARE_OPERATORS];

const NNARY_OPERATORS = {}; // 항의 개수

for(let operator of UNARY_OPERATORS){
	NNARY_OPERATORS[operator] = 1;
};

for(let operator of BINARY_OPERATORS){
	NNARY_OPERATORS[operator] = 2;
};

for(let operator of TERNARY_OPERATORS){
	NNARY_OPERATORS[operator] = 3; // 3항 이상
};

for(let operator of UNARY_OPERATORS){
	NNARY_OPERATORS[operator] = 1;
};


const CONTINUOUSELY_COMPARE = { // 5>3>1 과 같은 비교 연산자 처리, compare의 경우 특례 적용
	'less':true,
	'leq':true,
	'greater':true,
	'geq':true,
	'equal':true,
	'notEqual':true,
	'identical':true,
	'notIdentical':true,
	'similar':true,
	'notSimilar':true,
};


// concat은 Array에도 있는 특수성 때문에 불가


const _CITABLE = [
	[  -1.0,  -0.5,  NaN],
	[  -0.5,  -0.5,  NaN],
	[  -0.5,   0.0,  0.5],
	[   NaN,   0.5,  0.5],
	[   NaN,   0.5,  1.0],
	[  -1.0,   0.0,  1.0], // initial compare
];
_CITABLE.NaN = [NaN, NaN, NaN];
_CITABLE.NaN.NaN = NaN;
_CITABLE.forEach((x,i,A)=>(A[i].NaN = NaN));

const ALL = true;
const RTL = true;
const LTR = false;

///////////////
// 숫자 영역 //
///////////////

// 반올림 등 함수 확장

let _NA = { // 예기치 못한 오류를 방지하기 위한 특별값, 원래 값으로 반환 시 valueOf를 반환
	toString:function(){return 'N/A';},
	toStringEx:function(){return 'N/A';},
	valueOf:function(){return null;},
	
	less:function(k){return false},
	greater:function(k){return false;},
	leq:function(k){return false;},
	geq:function(k){return false;},
	
	equal:function(k){return this.valueOf()==k.valueOf();},
	notEqual:function(k){return this.valueOf()!=k.valueOf();},
	identical:function(k){return this.valueOf()===k.valueOf();},
	notIdentical:function(k){return this.valueOf()!==k.valueOf();},
	
	and:function(k){return nullToNA(this.valueOf()&&k.valueOf());},
	or:function(k){return nullToNA(this.valueOf()||k.valueOf());},
	nc:function(k){return nullToNA(this.valueOf()??k.valueOf());},
	
	not:function(){return true;},
	boolean:function(){return false;},
	
	inRange:function(){return false;},
	
	isBoolean:function(){return false;},
	isNumber:function(){return false;},
	isString:function(){return false;},
	isArray:function(){return false;},
	isNA:function(){return true;},
	
	count:function(){return 1;},
	validCount:function(){return 0;},
	strLen:function(){return this;},
	
	parseInt:function(){return NaN;},
	parseFloat:function(){return NaN;},
	typeof:'na',
	naValue:function(v){return v.isArray() ? [this].naValue(v) : v;},
	naValueObject:function(v){return v;},
	
};

for(let operator of ALL_OPERATORS){
	if(_NA[operator] === undefined)
		_NA[operator] = function(){return this;};
}

const NA = _NA;

NA.booleanObject = NA.boolean;
NA.similarObject = NA.similar;
NA.equalObject = NA.equal;
NA.notEqualObject = NA.notEqual;
NA.identicalObject = NA.identical;
NA.notIdenticalObject = NA.notIdentical;

//Error도 N/A로 취급

Error.prototype.isNumber = function(){return false;};
Error.prototype.isString = function(){return false;};
Error.prototype.isBoolean = function(){return false;};
Error.prototype.isArray = function(){return false;};
Error.prototype.isNA = function(){return true;};
Error.prototype.valueOf = function(){return null;};
Error.prototype.toStringEx = function(){return 'N/A ('+this.toString()+')';};
Error.prototype.naValueObject = function(v){return v;};

Error.try = function(fn, ...args){try{return fn(...args);}catch(e){return e;}}


for(let prop in NA){
	if(Error.prototype[prop] === undefined)
		Error.prototype[prop] = NA[prop];
}

// 안전호출 Guard(10).call('div', 0) // 에러시 에러 자체 반환
const Guard = function(_var){
	this.var = _var;
	this.call = function(name, ...args){
		try{
			return this.var[name](...args);
		}catch(e){
			console.warn('🛡️Protected By Error🛡️');
			return e;
		}
	};
	this.getAttr = this.attr = function(name){
		try{
			return this.var[name];
		}catch(e){
			console.warn('🛡️Protected By Error🛡️');
			return e;
		}
	};
	this.setAttr = function(name, value){
		try{
			return this.var[name] = value;
		}catch(e){
			console.warn('🛡️Protected By Error🛡️');
			return e;
		}
	};
	this.valueOf = function(){
		return this.var;
	};
	this.toString = function(){
		return this.var.toString();
	};
};

function nullToNA(x){
	return x===null || x===undefined ? NA : x;
};

Number.prototype.typeof = 'number';
String.prototype.typeof = 'string';
Array.prototype.typeof = 'array';
Boolean.prototype.typeof = 'boolean';

// 선택 실행 메소드
String.prototype.optional = 
Boolean.prototype.optional = 
Array.prototype.optional = 
Number.prototype.optional = 
Error.prototype.optional = 
function(run_or_survive, what, ...args){
	return run_or_survive ? this[what](...args) : this.valueOf();
};

NA.optional = function(run_or_survive, what, ...args){
	return run_or_survive ? this[what](...args) : this;
};

// 계산 중간 과정 디버깅 메소드

String.prototype.trace = 
Boolean.prototype.trace = 
Array.prototype.trace = 
Number.prototype.trace = 
Error.prototype.trace = 
NA.trace = function(){ // 계산 중 현재 값 확인, 스택 위치 조회 가능
	console.trace(this);
	return this;
};

String.prototype.debug = 
Boolean.prototype.debug = 
Array.prototype.debug = 
Number.prototype.debug = 
Error.prototype.debug = 
NA.debug = function(){ // 계산 중 현재 값 확인, 콘솔에 현재 값만 출력함
	console.log(this);
	return this;
};



// 보호 메소드 (오류를 분석하고 실행을 계속할 필요가 있을 때)
String.prototype.guard = 
Boolean.prototype.guard = 
Array.prototype.guard = 
Number.prototype.guard = 
Error.prototype.guard = 
NA.guard = 
function(what, ...args){
	try{
		return this[what](...args);
	}catch(e){return e;}
};



// || 컴바인 메소드 || inner, fusion 등에서 사용됨

// [10,4,2,8].combined(['sub:', 1], 'mean')
// = [10,4,2,8].sub(1).mean()

// 메소드명 앞에 @을 쓰면 속성이 반환됨
// [[10,4],[2,8,7]].combined('@length')

// 메소드명 앞에 @쓰고 뒤에 속성 값을 쓰면 속성 값을 지정할 수 있음, 이 때는 현재 객체를 반환
// [[10,4],[2,8,7],[6,5]].combined(['add',3],['@length', 2]).toStringEx() // [[13,7],[5,11,10]]

// 람다식 사용
// [[10,4],[2,8,7]].combined(['add',3],x=>alert(x.toStringEx()));

// [[10,4],[2,8,7]].innerCombined(1,['@length',2],['add',7]).toStringEx();

String.prototype.combined = 
Boolean.prototype.combined = 
Array.prototype.combined = 
Error.prototype.combined = 
Number.prototype.combined = 
NA.combined = function(...operators){
	let curr = this;
	
	for(operator of operators){
		if(typeof operator == 'function'){
			curr = operator(curr);
		}else if(operator.isArray()){
			let [[fname], args] = operator.knife(1);
			
			if(typeof fname == 'function'){
				curr = fname(curr);
			}else{
				if(fname.endsWith(':'))
					fname = fname.slice(0,-1);
				
				if(fname.startsWith('@')){
					fname = fname.slice(1);
					if(args[0] !== undefined)
						curr[fname] = args[0];
					else
						curr = curr[fname];
				}else
					curr = curr[fname](...args);
			}
		}else{
			if(operator.startsWith('@')){
				operator = operator.slice(1);
				curr = curr[operator];
			}else
				curr = curr[operator]();
		}
	}
	return curr;
};



// [퓨전 메소드]

// 혼합 연산, 평균과 표준편차 등등 동시에 구할 때 유용
// [1,4,2,8].fusion(['sum','mean','stdev','cardinality']) = 

// 매개변수가 필요한 경우 [1,4,2,8].fusion([['powerMean:', -1], ['powerMean:', 0]])

// 매개변수인지 중첩 퓨전인지 구별을 위해서 함수명 뒤에 ':' 을 붙여서 구별함
// [1,4,2,8].fusion([['sadd', 'sadd'], ['sadd:', 'sadd']]).toStringEx();
// = [['1428','1428'],['1sadd','4sadd','2sadd','8sadd']]

// 일반 숫자 등에 대해서도 퓨전 연산 가능
// 10..fusion(['minus', 'reciproc',['combined:',['add',5],['mul',2]]]).toStringEx() = [-10, 0.1, 30]

String.prototype.fusion = 
Boolean.prototype.fusion = 
Array.prototype.fusion = 
Number.prototype.fusion = 
Error.prototype.fusion = 
NA.fusion = function(operators){
	let that = this;
	if(operators.isArray()){
		let [[car], cdr] = operators.knife(1);
		if(car.isString() && car.endsWith(':')){ // 중첩 목적이 아닌 매개변수를 목적으로 한 경우 뒤에 콜론을 붙임 
			return this[car.slice(0,-1)](...cdr);
		} // 아니면 중첩
		return operators.map(x=>that.fusion(x));
	}
	return this[operators]();
};

String.prototype.this = 
Boolean.prototype.this = 
Array.prototype.this = 
Number.prototype.this = 
Error.prototype.this = 
NA.this = function(){return this;};

// 에러 목록

class ETW extends Error{
	constructor(m){
		super(m);
		this.name = 'ErrorToWarning';
	}
};

class BroadcastingError extends Error{
	constructor(m){
		super(m);
		this.name = 'BroadcastingError';
	}
};

class ArrayBoundaryError extends Error{
	constructor(m){
		super(m);
		this.name = 'ArrayBoundaryError';
	}
};




// 이 함수는 경고로 수준을 완화한다.
String.prototype.etw = 
Boolean.prototype.etw = 
Array.prototype.etw = 
Number.prototype.etw = 
Error.prototype.etw = 
NA.etw = 
function(what, ...args){
	try{
		return this[what](...args);
	}catch(e){console.warn(new ETW(e)); return e;}
};

// 검증 함수, falsy value일 때 throw, 보호나 경고 함수와 같이 쓸 수 있다
String.prototype.verify = 
Boolean.prototype.verify = 
Array.prototype.verify = 
Number.prototype.verify = 
Error.prototype.verify = 
NA.verify = 
function(message){
	if(!this.booleanObject()) throw new Error(message);
	return this;
};

// 체크 함수, 검증 함수와 달리 Warning을 적용함
String.prototype.check = 
Boolean.prototype.check = 
Array.prototype.check = 
Number.prototype.check = 
Error.prototype.check = 
NA.check = 
function(message){
	if(!this.booleanObject()) console.warn(new Error(message));
	return this;
};

// 결측치 대체 함수, nc 함수 폐기

Number.prototype.naValue = function(v){return v.isArray() ? [this].naValue(v) : this.valueOf();};

String.prototype.naValueObject = 
Boolean.prototype.naValueObject = 
Array.prototype.naValueObject = 
Number.prototype.naValueObject = function(v){return this.valueOf();};


Number.prototype.round = function(){return Math.round(this);};
Number.prototype.ceil = function(){return Math.ceil(this);};
Number.prototype.floor = function(){return Math.floor(this);};
Number.prototype.trunc = function(){return Math.trunc(this);};

Number.prototype.fractionRound = function(k){return Math.round(this * k) / k;};
Number.prototype.fractionCeil = function(k){return Math.ceil(this * k) / k;};
Number.prototype.fractionFloor = function(k){return Math.floor(this * k) / k;};
Number.prototype.fractionTrunc = function(k){return Math.trunc(this * k) / k;};

Number.prototype.factorRound = function(k){return Math.round(this / k) * k;};
Number.prototype.factorCeil = function(k){return Math.ceil(this / k) * k;};
Number.prototype.factorFloor = function(k){return Math.floor(this / k) * k;};
Number.prototype.factorTrunc = function(k){return Math.trunc(this / k) * k;};

Number.prototype.digitRound = function(p){return p>=0?this.fractionRound(10**p):this.factorRound(10**-p);};
Number.prototype.digitCeil = function(p){return p>=0?this.fractionCeil(10**p):this.factorCeil(10**-p);};
Number.prototype.digitFloor = function(p){return p>=0?this.fractionFloor(10**p):this.factorFloor(10**-p);};
Number.prototype.digitTrunc = function(p){return p>=0?this.fractionTrunc(10**p):this.factorTrunc(10**(-p));};

// 0.1+0.2!=0.3 방지를 위하여 불필요한 부분은 보정함
Number.prototype.precise = function(){let k = Math.abs(Math.abs(this)*126e10 % 1 - 0.5), f = 126*10**(10-Math.max(Math.floor(Math.log10(Math.abs(this))),0)); return k >= 0.49 ? Math.round(this*f)/f : +this;};

// 기본 연산자 기호화
// 배열 연산을 위해서...

// + 연산자의 혼란을 막기 위해 .add, .concat 별도 추가!

Number.prototype.add = function(k){return k.isArray() ? [this].add(k) : this+parseFloat(+k);};
Number.prototype.padd = function(k){return k.isArray() ? [this].padd(k) : (this+parseFloat(+k)).precise();};
Number.prototype.sub = function(k){return k.isArray() ? [this].sub(k) : this-k;};
Number.prototype.psub = function(k){return k.isArray() ? [this].psub(k) : (this-k).precise();};
Number.prototype.mul = function(k){return k.isArray() ? [this].mul(k) : this*k;};
Number.prototype.pmul = function(k){return k.isArray() ? [this].pmul(k) : (this*k).precise();};
Number.prototype.div = function(k){return k.isArray() ? [this].div(k) : this/k;};
Number.prototype.pdiv = function(k){return k.isArray() ? [this].pdiv(k) : (this/k).precise();};
Number.prototype.divLim0 = function(k){return k.isArray() ? [this].div(k) : this==0&&k==0?0:this/k;}; // 0으로 나누기 시 문제 발생하는 코드에서의 예외처리, 단 극한의 원칙에 따른다. (분모도 0이면 분자도 0이야 극한값 존재)
Number.prototype.divLim1 = function(k){return k.isArray() ? [this].div(k) : this==0&&k==0?1:this/k;}; // .divLim0() : 0으로 나누면 0 등등
Number.prototype.divLimInf = function(k){return k.isArray() ? [this].div(k) : this==0&&k==0?1/this/k:this/k;}; // 무한대 처리 (내부적으로 +0, -0도 있으므로 1/k로 표현)
Number.prototype.mod = function(k){return k.isArray() ? [this].mod(k) : this%k;};
Number.prototype.idiv = function(k){return k.isArray() ? [this].idiv(k) : Math.trunc(this/k);};
Number.prototype.dm = function(k){return k.isArray() ? [this].dm(k) : [this.idiv(k), this.mod(k)];};
Number.prototype.modf = function(){return [this.idiv(1), this.mod(1)];};
Number.prototype.powLim1 = // 0**0 == 1
Number.prototype.pow = function(k){return k.isArray() ? [this].pow(k) : this**k;};
Number.prototype.powLim0 = function(k){return k.isArray() ? [this].pow(k) : this==0&&k==0?0:this**k;};
Number.prototype.plus = function(){return +this;};
Number.prototype.minus = function(){return -this;};
Number.prototype.reciproc = function(){return 1/this;};
Number.prototype.bitwiseAnd = function(k){return k.isArray() ? [this].bitwiseAnd(k) : this&k;};
Number.prototype.bitwiseOr = function(k){return k.isArray() ? [this].bitwiseOr(k) : this|k;};
Number.prototype.bitwiseXor = function(k){return k.isArray() ? [this].bitwiseXor(k) : this^k;};
Number.prototype.bitwiseNot = function(){return ~this;};
Number.prototype.bitwiseLsh = function(k){return k.isArray() ? [this].bitwiseLsh(k) : this<<k;};
Number.prototype.bitwiseRsh = function(k){return k.isArray() ? [this].bitwiseRsh(k) : this>>k;};
Number.prototype.bitwiseUrsh = function(k){return k.isArray() ? [this].bitwiseUrsh(k) : this>>>k;};
Number.prototype.abs = function(){return this<0?-this:+this;};
Number.prototype.and = function(k){return k.isArray() ? [this].and(k) : nullToNA(this.valueOf()&&k.valueOf());};
Number.prototype.or = function(k){return k.isArray() ? [this].or(k) : nullToNA(this.valueOf()||k.valueOf());};
Number.prototype.xor = function(k){return k.isArray() ? [this].xor(k) : nullToNA(this.valueOf()&&k.valueOf() ? false : this.valueOf()||k.valueOf());};
Number.prototype.not = function(){return !this.valueOf();};
Number.prototype.booleanObject = 
Number.prototype.boolean = function(){return !!this.valueOf();};
Number.prototype.less = function(k){return k.isArray() ? [this].less(k) : this<k;};
Number.prototype.leq = function(k){return k.isArray() ? [this].leq(k) : this<=k;};
Number.prototype.greater = function(k){return k.isArray() ? [this].greater(k) : this>k;};
Number.prototype.geq = function(k){return k.isArray() ? [this].geq(k) : this>=k;};
Number.prototype.compare = function(k){return k.isArray() ? [this].compare(k) : this>k?1:this<k?-1:this==k?0:NaN;};
Number.prototype._citrans = function(k){return k.isArray() ? [this]._citrans(k) : _CITABLE[this*2+2][k+1];};
Number.prototype.equalObject = function(k){return this.valueOf()==k;};
Number.prototype.equal = function(k){return k.isArray() ? [this].equal(k) : this.valueOf()==k;};
Number.prototype.notEqualObject = function(k){return this.valueOf()!=k;};
Number.prototype.notEqual = function(k){return k.isArray() ? [this].notEqual(k) : this.valueOf()!=k;};
Number.prototype.similarObject = function(k){return this.valueOf()==k || k.isString() && this.toString().similar(k) || k.isNumber() && this.precise() == k.precise();};
Number.prototype.similar = function(k){return k.isArray() ? [this].similar(k) : k.isString() ? this.toString().similar(k) : this.precise()==k.precise();};
Number.prototype.notSimilar = function(k){return k.isArray() ? [this].notSimilar(k) : k.isString() ? this.toString().notSimilar(k) : this.precise()!=k.precise();};
// 숫자에서는 0.1.add(0.2).similar(0.3) 이렇게 숫자가 비슷하면 참으로 처리
// 문자에서는 대/소문자를 구별하지 않고 처리
// 숫자,문자 혼합형 : 문자로 변환

Number.prototype.equals = function(...K){ // 3==3==3
	let last = this.valueOf();
	for(let k of K){
		if(!(last == k.valueOf())) return false; // NaN도 있을 수 있기에 < 로 표현 불가
		last = k;
	};
	return true;
};
//Number.prototype.notEquals 구현 불가, 정의가 애매모호
Number.prototype.identicalObject = function(k){return this.valueOf()===k;};
Number.prototype.identical = function(k){return k.isArray() ? [this].identical(k) : this.valueOf()===k;};
Number.prototype.notIdenticalObject = function(k){return this.valueOf()!==k;};
Number.prototype.notIdentical = function(k){return k.isArray() ? [this].notIdentical(k) : this.valueOf()!==k;};
Number.prototype.least = function(k){return k.isArray() ? [this].least(k) : this.less(k) ? +this : k;};
Number.prototype.greatest = function(k){return k.isArray() ? [this].greatest(k) : this.greater(k) ? +this : k;};
Number.prototype.sign = function(){return Math.sign(this);};
Number.prototype.exp = function(){return Math.exp(this);};
Number.prototype.expm1 = function(){return Math.expm1(this);};
Number.prototype.log = function(){return Math.log(this);};
Number.prototype.logBase = function(k){return k.isArray() ? [this].logBase(k) : Math.log(this) / Math.log(k);};
Number.prototype.log10 = function(){return Math.log10(this);};
Number.prototype.log1p = function(){return Math.log1p(this);};
Number.prototype.pow10 = function(){return 10 ** this;};
Number.prototype.center = function(k){return k.isArray() ? [this].center(k) : (this+k)/2;}; // 등차중항
Number.prototype.gcenter = function(k){return k.isArray() ? [this].gcenter(k) : (this*k).sqrt();}; // 등비중항
Number.prototype.hcenter = function(k){return k.isArray() ? [this].hcenter(k) : 2*this*k/(this+parseFloat(k));}; // 조화중항
Number.prototype.abSub = function(k){return k.isArray() ? [this].abSub(k) : Math.abs(this-k);}; // 뺄셈 절댓값
Number.prototype.hAbSub = function(k){return k.isArray() ? [this].hAbSub(k) : Math.abs(this-k)/2;}; // 뺄셈 절댓값 절반
Number.prototype.delta = function(k){return k.isArray() ? [this].delta(k) : (k-this)/this;}; // 변화량 (자신 객체값 기준)
Number.prototype.sqSub = function(k){return k.isArray() ? [this].sqSub(k) : (this-k)**2;}; // 뺄셈 제곱
Number.prototype.atan2 = function(k){return k.isArray() ? [this].atan2(k) : Math.atan2(this,k);};
Number.prototype.hypot = function(k){return k.isArray() ? [this].hypot(k) : Math.hypot(this,k);}; // 피타고라스 정리
Number.prototype.toXY = function(k){return k.isArray() ? [this].toXY(k) : [this*Math.cos(k),this*Math.sin(k)];}; // 극좌표->직교좌표
Number.prototype.toPolar = function(k){return k.isArray() ? [this].toPolar(k) : [Math.hypot(k,this),Math.atan2(k,this)];}; // 직교좌표->극좌표
Number.prototype.percent = function(){return this*100;}; // % 값으로 표현
Number.prototype.unpercent = function(){return this/100;}; // % 값을 일반형 비율로
Number.prototype.permil = function(){return this*1000;}; // ‰ 값으로 표현
Number.prototype.unpermil = function(){return this/1000;}; // ‰ 값을 일반형 비율로
Number.prototype.square = function(){return this*this;}; // 제곱
Number.prototype.cube = function(){return this**3;}; // 세제곱
Number.prototype.sqrt = function(){return Math.sqrt(this);}; // 제곱근
Number.prototype.cbrt = function(){return Math.cbrt(this);}; // 세제곱근
Number.prototype.root = function(k){return k.isArray() ? [this].root(k) : Math.abs(k % 2) == 1 ? Math.sign(this) * (Math.abs(this) ** (1/k)) : this ** (1/k);}; // k제곱근, k가 홀수이고 숫자가 음수인 경우
Number.prototype.sin = function(){return Math.sin(this);}; // 각종 삼각함수들...
Number.prototype.cos = function(){return Math.cos(this);};
Number.prototype.tan = function(){return Math.tan(this);};
Number.prototype.csc = function(){return 1/Math.sin(this);};
Number.prototype.sec = function(){return 1/Math.cos(this);};
Number.prototype.cot = function(){return 1/Math.tan(this);};
Number.prototype.asin = function(){return Math.asin(this);};
Number.prototype.acos = function(){return Math.acos(this);};
Number.prototype.atan = function(){return Math.atan(this);};
Number.prototype.acsc = function(){return Math.asin(1/this);};
Number.prototype.asec = function(){return Math.acos(1/this);};
Number.prototype.acot = function(){return Math.atan(1/this);};
Number.prototype.sinh = function(){return Math.sinh(this);};
Number.prototype.cosh = function(){return Math.cosh(this);};
Number.prototype.tanh = function(){return Math.tanh(this);};
Number.prototype.asinh = function(){return Math.asinh(this);};
Number.prototype.acosh = function(){return Math.acosh(this);};
Number.prototype.atanh = function(){return Math.atanh(this);};
Number.prototype.toRadians = function(){return this/180*Math.PI;}; // 육십분법 -> 호도법
Number.prototype.toDegrees = function(){return this*180/Math.PI;}; // 호도법 -> 육십분법

Number.prototype.inRange = function(u, v, boundary){ // 해당 범위 이내로 들어왔는지 체크, boundary는 경계선으로 수학에서 쓰던 기호와 동일
	if(boundary === undefined) boundary = '[]';
	switch(boundary){
		// 범위 내
		case '()':
		return u<this && this<v;
		case '[)':
		return u<=this && this<v;
		case '[]':
		return u<=this && this<=v;
		case '(]':
		return u<this && this<=v;
		// 범위 외
		case ')(':
		return this<u || this>v;
		case ')[':
		return this<u || this>=v;
		case '][':
		return this<=u || this>=v;
		case '](':
		return this<=u || this>v;
		default:
		return false;
	}
};

Number.prototype.fitInRange = function(u, v){return this.greatest(u).least(v);} // [u, v] 범위에 벗어나면 맞게 조정

/*
트랜스폼 메소드
- 해당 점 안의 범위를 다른 범위로 이동시킴
- 기본은 선형이며, 기본적으로 [0, 1] 범위에서 변환이 발생함

a1, m1, b1 : 변환전의 점  p1 : 변환 전의 지수
a2, m2, b2 : 변환후의 점  p2 : 변환 후의 지수

[기본 원칙]
x = a1 -> x = a2
x = b1 -> x = b2
이 사이를 어떻게 변환할 지에 대한 방법은 아래 중에서 선택

x.transform(a1, b1, a2, b2) : 숫자를 선형 형태로 변환함
x.transCurve(a1, m1, b1, a2, m2, b2) : 곡선형, 중간지점을 설정할 수 있음
x.transPower(a1, b1, p1, a2, b2, p2) : 제곱형, p1, p2는 변환 전과 후의 지수
x.transLog(a1, b1, a2, b2) : 로그 형태로 변환, a1, b1은 모두 양수
x.transExp(a1, b1, a2, b2) :  e^x 형태로 변환, a2, b2은 모두 양수

Array.numbers(6).transform(0,5,40,70) = [40,46,52,58,64,70]
Array.linspace(20,80,7).transform(20,80,10,50).round()     = [10,17,23,30,37,43,50]
Array.linspace(20,80,7).transPower(20,80,1,10,50,2).round()  = [10,11,14,20,28,38,50]
Array.linspace(20,80,7).transPower(20,80,1,10,50,0.5).round() = [10,26,33,38,43,47,50]
Array.linspace(20,80,7).transLog(20,80,10,50).round()      = [10,22,30,36,42,46,50]
Array.linspace(20,80,7).transExp(20,80,10,50).round()      = [10,13,17,22,29,38,50]
Array.linspace(0,100,6).transCurve(0,40,100,0,20,100).round()      = [0,6,20,41,68,100]
Array.linspace(0,100,6).transCurve(0,40,100,0,60,100).round()      = [0,41,60,75,88,100]

*/

Number.prototype.transform = function(a1, b1, a2, b2){a2??=0; b2??=1; return (this-a1)/(b1-a1)*(b2-a2)+a2;}; // 점의 위치를 내(외)분하는 비율에 맞게 변형
Number.prototype.transCurve = function(a1, m1, b1, a2, m2, b2){a2??=0; m2??=0.5; b2??=1; return ((this-a1)/(b1-a1))**(Math.log((m2-a2)/(b2-a2))/Math.log((m1-a1)/(b1-a1)))*(b2-a2)+a2;}; // 곡선형, 가운데 지점 설정
Number.prototype.transPower = function(a1, b1, p1, a2, b2, p2){a2??=0; b2??=1; p2??=1; return ((this-a1)/(b1-a1))**(p2/p1)*(b2-a2)+a2;}; // 곡선형
Number.prototype.transLog = function(a1, b1, a2, b2){a2??=0; b2??=1; return ((this.log()-a1.log())/(b1.log()-a1.log()))*(b2-a2)+a2;}; // 로그형
Number.prototype.transExp = function(a1, b1, a2, b2){a2??=1; b2??=Math.E; return (((this-a1)/(b1-a1))*(b2.log()-a2.log())+a2.log()).exp();}; // 지수형

/*

가중덧셈
- 뒤 인자에 해당 인자의 가중치, 알파값을 적으며, 계산 공식은 A(1-α)+Bα

[40,60,58,37].alphaAdd([32,29,65,81], 0.7) = [34.4,38.3,62.9,67.8] = [40*0.3+32*0.7,...]
[40,60,58,37].alphaAdd([32,29,65,81], 0.2) = [38.4,53.8,59.4,45.8]

*/

Number.prototype.alphaAdd = function(k, alpha){return k.isArray() ? [this].alphaAdd(k, alpha) :  this*(1-alpha)+k*alpha;}; // 가중합산


// 숫자에서의 문자열 연산, 곱셈을 적용하는 특별한 경우 제외 모두 문자열과의 연산이므로 모두 문자열로 위탁함

Number.prototype.concat = function(...K){return this.toString().concat(...K);};
Number.prototype.concatFrom = function(...K){return K.reverseCopy().join('').concat(this);};


Number.prototype.splus = function(k){return this.toString().valueOf();};
Number.prototype.sminus = function(k){return this.toString().sminus();};
Number.prototype.sreciproc = function(k){return this.toString().sreciproc();};

Number.prototype.sadd = function(k){return k.isArray() ? [this].sadd(k) : this.toString().sadd(k);};
Number.prototype.backSadd = function(k){return k.isArray() ? [this].backSadd(k) : this.toString().backSadd(k);};

Number.prototype.ssub = function(k){return k.isArray() ? [this].ssub(k) : this.toString().ssub(k);}; // String으로 변환 후 String에서 연산함
Number.prototype.backSsub = function(k){return k.isArray() ? [this].backSsub(k) : this.toString().backSsub(k);};

Number.prototype.smul = function(k){return k.isArray() ? [this].smul(k) : this.toString().smul(k);};
Number.prototype.backSmul = function(k){return k.isArray() ? [this].backSmul(k) : k.toString().smul(this);}; 

Number.prototype.sdiv = function(k){return k.isArray() ? [this].sdiv(k) : this.toString().sdiv(k);};
Number.prototype.backSdiv = function(k){return k.isArray() ? [this].backSdiv(k) : k.toString().sdiv(this);};

Number.prototype.smod = function(k){return k.isArray() ? [this].smod(k) : this.toString().smod(k);};
Number.prototype.backSmod = function(k){return k.isArray() ? [this].backSmod(k) : k.toString().smod(this);}; 

Number.prototype.slsh = function(k){return k.isArray() ? [this].slsh(k) : this.toString().slsh(k);};
Number.prototype.backSlsh = function(k){return k.isArray() ? [this].backSlsh(k) : k.toString().slsh(this);}; 

Number.prototype.srsh = function(k){return k.isArray() ? [this].srsh(k) : this.toString().srsh(k);};
Number.prototype.backSrsh = function(k){return k.isArray() ? [this].backSrsh(k) : k.toString().srsh(this);}; 

Number.prototype.sdivN = function(k){return k.isArray() ? [this].sdivN(k) : this.toString().sdivN(k);};
Number.prototype.backSdivN = function(k){return k.isArray() ? [this].backSdivN(k) : k.toString().sdivN(this);}; 

Number.prototype.toLowerCase = String.prototype.toLowerCase;
Number.prototype.toUpperCase = String.prototype.toUpperCase;

// 진법 변환하여 문자열로
Number.prototype.hex = function(){ return this.toString(16); };
Number.prototype.uhex = function(){ return this.toString(16).toUpperCase(); };
Number.prototype.oct = function(){ return this.toString(8); };
Number.prototype.bin = function(){ return this.toString(2); };

// signed integer 처리
Number.prototype.byteCut = function(){ return (this & 0xFF) << 24 >> 24; };
Number.prototype.shortCut = function(){ return (this & 0xFFFF) << 16 >> 16; };
Number.prototype.mediumCut = function(){ return (this & 0xFFFFFF) << 8 >> 8; };
Number.prototype.intCut = function(){ return this & 0xFFFFFFFF; };

Number.prototype.baseString = function(k){
	if(k.isArray()) return [this].baseString(k);
	k = parseInt(k);
	if(k.inRange(2,36))
		return this.toString(k.round());
	else{
		
		return this.toString(k.fitInRange(2,36));
	}
};



/*
문자열 포맷팅 규정
,   : 천단위 구분
0   : 앞의 0 채우기 (없을 시 공백)
5   : 확보할 문자 수 (소수점 제외)
.03 : 소수점 이하 자리 수, 뒤에 0 표시
.3  : 소수점 이하 자리 수, 뒤에 0 제외
r36 : 상세 진법
<   : 왼쪽 정렬
>   : 오른쪽 정렬
^   : 가운데 정렬
$,; : 쓰이는 기호 치환 (예시는 ,를 ;로), 두 문자로 표시함
#*  : 공백 치환 (예시는 공백을 *로)

<< 접미어 >>
d,x,o,b : 진법 (C언어에 따름) (d로 쓸때만 반올림)
e   : 과학적 표기법
p   : toPrecision 적용
i   : 정수 파트만 표시 (123)
f   : 소수 파트만 표시 (.123)

-> 진법 등에 대문자로 표시 하면 대문자 적용


ex> 10324.768.sfmt(",05.3R36") = "007YS.RNB"

7ys.rnbt361q

배열에서 쓸 시에는 afmt 를 쓰며, 이 때는 앞에는 % 를 붙이고 [] 등으로 첨자를 처리해야 함
() [] {} 을 쓸 수 있으며, 그외의 경우는 [$<>] 등을 적용하여 대체 가능함
괄호 모양을 안쓰려면 `() 등을 사용
뒤의 @ 는 마지막 콤마를 표시함

[[10,20],[30,40],5].afmt("[(%d);@],") = [(10;20;),(30;40;),5]
[[10,20],[30,40],5].afmt("[`(%d);@],") = [10;20;,30;40;,5]


*/
/*
Number.prototype.sfmt = function(k){
	if(k.isArray()) return [this].sfmt(k);
	k = k.toString();
	
	let pos = 0;
	let pref = {comma:false, radix:10, digits:0, prec:6, plus:false, align:3, lzero:false, tzero:false, replaces:[], };
	
	while(pos < k.length){
		if('1' <= k[pos] && k[pos] <= '9'){
			break;
		}
		switch(k[pos]){
			case ',': pref.comma = true; pos++; break;
			case '+': pref.plus = true; pos++; break;
			case '<': pref.align = 1; pos++; break;
			case '^': pref.align = 2; pos++; break;
			case '>': pref.align = 3; pos++; break;
			case '0': pref.lzero = true; pos++; break;
		}
	}
	// 여백
	while('1' <= k[pos] && k[pos] <= '9'){
		pref.digits = pref.digits*10 + +k[pos];
		pos++;
	}
	// 소수점
	if(k[pos] == '.'){
		pos++;
		if(k[pos] == '0'){
			pref.tzero = true;
			pos++;
		}
		while('0' <= k[pos] && k[pos] <= '9'){
			pref.prec = pref.prec*10 + +k[pos];
			pos++;
		}
	}
	switch(k[pos]){
		case 'd': pref.radix = 10; pos++; break;
		case 'x': pref.radix = 16; pos++; break;
		case 'o': pref.radix =  8; pos++; break;
		case 'b': pref.radix =  2; pos++; break;
	}
	
	let str = (this>0 && pref.plus ? '+' : '')+this.toString(pref.radix);
	
	return str;
};
*/


// 패킹

Number.prototype.pack1 = function(){return [this.valueOf()];};
Number.prototype.pack2 = function(k){return k.isArray() ? [this].pack2(k) : [this.valueOf(), k];};
Number.prototype.backPack2 = function(k){return k.isArray() ? [this].backPack2(k) : [k, this.valueOf()];};
Number.prototype.packs = function(...K){return [this.valueOf(), ...K];};

// 역방향 연산

Number.prototype.backAdd = function(k){return k.isArray() ? [this].backAdd(k):parseFloat(+k)+this;};
Number.prototype.backPadd = function(k){return k.isArray() ? [this].backPadd(k):(parseFloat(+k)+this).precise();};
Number.prototype.backSub = function(k){return k.isArray() ? [this].backSub(k):k-this;};
Number.prototype.backPsub = function(k){return k.isArray() ? [this].backPsub(k):(k-this).precise();};
Number.prototype.backMul = function(k){return k.isArray() ? [this].backMul(k):k*this;};
Number.prototype.backPmul = function(k){return k.isArray() ? [this].backPmul(k):(k*this).precise();};
Number.prototype.backDiv = function(k){return k.isArray() ? [this].backDiv(k):k/this;};
Number.prototype.backPdiv = function(k){return k.isArray() ? [this].backPdiv(k):(k/this).precise();};
Number.prototype.backDivLim0 = function(k){return k.isArray() ? [this].backDivLim0(k):k==0&&this==0?0:k/this;};
Number.prototype.backDivLim1 = function(k){return k.isArray() ? [this].backDivLim1(k):k==0&&this==0?1:k/this;};
Number.prototype.backDivLimInf = function(k){return k.isArray() ? [this].backDivLimInf(k):k==0&&this==0?1/k/this:k/this;};
Number.prototype.backMod = function(k){return k.isArray() ? [this].backMod(k):k%this;};
Number.prototype.backIdiv = function(k){return k.isArray() ? [this].backIdiv(k):Math.trunc(k/this);};
Number.prototype.dmFrom = function(k){return k.isArray() ? [this].dmFrom(k):[k.idiv(this), k.mod(this)];};
Number.prototype.backPowLim1 = 
Number.prototype.backPow = function(k){return k.isArray() ? [this].backPow(k):k**this;};
Number.prototype.backPowLim0 = function(k){return k.isArray() ? [this].backPowLim0(k):k==0&&this==0?0:k**this;};
Number.prototype.backLogBase = function(k){return k.isArray() ? [this].backLogBase(k) : Math.log(k) / Math.log(this);};
Number.prototype.backBitwiseLsh = function(k){return k.isArray() ? [this].backBitwiseLsh(k) : k<<this;};
Number.prototype.backBitwiseRsh = function(k){return k.isArray() ? [this].backBitwiseRsh(k) : k>>this;};
Number.prototype.backBitwiseUrsh = function(k){return k.isArray() ? [this].backBitwiseUrsh(k) : k>>>this;};
Number.prototype.backAnd = function(k){return k.isArray() ? [this].backAnd(k) : nullToNA(k.valueOf()&&this.valueOf());};
Number.prototype.backOr = function(k){return k.isArray() ? [this].backOr(k) : nullToNA(k.valueOf()||this.valueOf());};
Number.prototype.backXor = function(k){return k.isArray() ? [this].backXor(k) : nullToNA(k.valueOf()&&this.valueOf()?false:k.valueOf()||this.valueOf());};
Number.prototype.backRoot = function(k){return k.isArray() ? [this].backRoot(k) : Math.abs(this % 2) == 1 ? Math.sign(k) * (Math.abs(k) ** (1/this)) : k ** (1/this);};




Number.prototype.for = function(fn){
	for(let i=0;i<this;i++){
		fn(i);
	}
};

Number.prototype.forDown = function(fn){
	for(let i=this-1;i>=0;i--){
		fn(i);
	}
};

Number.prototype.forSum = function(fn){ // 숫자 기반
	if(fn == undefined) fn = identical;
	let sum = 0;
	for(let i=0;i<this;i++){
		sum = sum.add(fn(i));
	}
	return sum;
};

Number.prototype.forSumBase1 = function(fn){ // 숫자 기반
	if(fn == undefined) fn = identical; // 함수 안정하면 1부터 n까지의 합
	let sum = 0;
	for(let i=1;i<=this;i++){
		sum = sum.add(fn(i));
	}
	return sum;
};

Number.prototype.forConcat = function(fn){ // 문자 기반
	if(fn == undefined) fn = identical;
	let sum = '';
	for(let i=0;i<this;i++){
		sum = sum.concat(fn(i));
	}
	return sum;
};

Number.prototype.forConcatBase1 = function(fn){ // 문자 기반
	if(fn == undefined) fn = identical;
	let sum = '';
	for(let i=1;i<=this;i++){
		sum = sum.concat(fn(i));
	}
	return sum;
};

Number.prototype.forProd = function(fn){ // 곱하기
	if(fn == undefined) fn = identical;
	let sum = 1;
	for(let i=0;i<this;i++){
		sum = sum.mul(fn(i));
	}
	return sum;
};

Number.prototype.forProdBase1 = function(fn){ // 곱하기 (서수 - 펙토리얼 구할 때 유리)
	if(fn == undefined) fn = identical;
	let sum = 1;
	for(let i=1;i<=this;i++){
		sum = sum.mul(fn(i));
	}
	return sum;
};

Number.prototype.isOdd = 
Number.prototype.isOddNumber = function(){
	return Math.abs(this) % 2 == 1;
};

Number.prototype.isEven = 
Number.prototype.isEvenNumber = function(){
	return this % 2 == 0;
};

Number.prototype.isPrime = 
Number.prototype.isPrimeNumber = function(){ // 소수 여부
	if(this <= 1 || this > 1e8 || this % 1) return false; // 너무 큰 수 적용 불가(랙 방지), 정수가 아니거나 1은 소수로 취급 안함
	for(let i=2;i*i<=this;i++){
		if(this % i == 0) return false;
	}
	return true;
};

Number.prototype.divisors = function(){ // 약수
	let array1 = [1];
	let array2 = [+this];
	
	if(this < 1 || this > 1e8 || this % 1) return Array.NaA; // 너무 큰 수 적용 불가(랙 방지), 정수가 아닌 경우 등등은 NaA 반환
	
	if(this == 1) return [1];
	
	for(let i=2;i*i<=this;i++){
		if(this % i == 0){
			array1.push(i);
			if(i*i!=this)
				array2.push(this/i);
		}
	}
	
	return array1.concat(array2.reverse());
};

Number.prototype.isPositive = function(){
	return this > 0;
};

Number.prototype.isNegative = function(){
	return this < 0;
};

Number.prototype.isZero = function(){
	return this == 0;
};

Number.prototype.isNaN = function(){
	return isNaN(this);
};

Number.prototype.isFinite = function(){
	return isFinite(this);
};


Number.prototype.normal = function(m1, s1, m2, s2){return (this-m1)/s1*(s2??1)+(m2??0);};

Number.prototype.gcd = function(b){ // 최대공약수
	let a=this, t;
	
	while(b){
		t = a % b;
		a = b;
		b = t;
	}
	return Math.abs(a);
};

Number.prototype.lcm = function(b){ // 최소공배수
	return Math.abs(this / this.gcd(b) * b);
};

Number.prototype.coprime = function(b){ // 서로소 여부
	return this.gcd(b) == 1;
};

Number.prototype.ratio = function(lim){
	if(!lim) lim = 2**16;
	var fi = [];
	var m, k;
	var An = 0, Ad = 1, Bn = 1, Bd = 0, Mn, Md, i, kf;
	
	var x = this;
	var sg = Math.sign(x);
	if(sg < 0) x = -x;

	for (i = 0; i < 32; i++) {

		// k factor 사용
		Mn = An + Bn;
		Md = Ad + Bd;
		m = Mn / Md;
		k = (An - Ad*x) / (Bd*x - Bn);
		if (x < m) { // Left
			k = (Bd*x - Bn) / (An - Ad*x);
			kf = Math.floor(k);
			if (Ad && kf > Math.trunc((lim - Bd) / Ad)) {
				kf = Math.trunc((lim - Bd) / Ad);

				Bn = kf*An + Bn;
				Bd = kf*Ad + Bd;

				break;
			}else if(kf < 0) break;

			Bn = kf*An + Bn;
			Bd = kf*Ad + Bd;

			if (Bn / Bd == x) {
				fi = [sg < 0 ? -Bn : Bn, Bd];
				return fi;
			}
		}
		else if (x > m) { // Right
			kf = Math.floor(k);
			if (Bd && kf > Math.trunc((lim - Ad) / Bd)) {
				kf = Math.trunc((lim - Ad) / Bd);

				An = An + kf*Bn;
				Ad = Ad + kf*Bd;

				break;
			}else if(kf < 0) break;

			An = An + kf*Bn;
			Ad = Ad + kf*Bd;

			if (An / Ad == x) {
				fi = [sg < 0 ? -An : An, Ad];
				return fi;
			}
		}
		else {
			fi = [sg < 0 ? -Mn : Mn, Md];
			return fi;
		}

	}
	
	if (Math.abs(x - An / Ad) >= Math.abs(x - Bn / Bd))
		fi = [Bn, Bd];
	else
		fi = [An, Ad];
		
	if(sg < 0) fi[0] *= -1;

	return fi;
};

Number.prototype.asFraction = function(b){ // 서로소 여부
	return this.ratio(1000000);
};

Number.prototype.describe = function(k){
	let dic = {};
	if(k != undefined){
		for(let op of BINARY_OPERATORS){
			try{
				dic[op] = this[op](k);
			}catch(e){}
		}
	}else{
		for(let op of UNARY_OPERATORS){
			try{
				dic[op] = this[op]();
			}catch(e){}
		}
	}
	return dic;
};

// 항등원 정리 (연산 a@b에 대해 I@a@b = a@b가 성립하는 하나의 I, 존재 안하면 NaN 반환)
Number.identities = {
	'add': 0,
	'backAdd': 0,
	'sub': NaN,
	'backSub': NaN,
	'mul': 1,
	'backMul': 1,
	'div': NaN,
	'backDiv': NaN,
	// 사칙 연산
	'padd': 0,
	'backPadd': 0,
	'psub': NaN,
	'backPsub': NaN,
	'pmul': 1,
	'backPmul': 1,
	'pdiv': NaN,
	'backPdiv': NaN,
	// 정밀 보정 사칙 연산
	'divLim0': NaN,
	'divLim1': NaN,
	'divLimInf': NaN,
	'backDivLim0': NaN,
	'backDivLim1': NaN,
	'backDivLimInf': NaN,
	// 
	'idiv': NaN,
	'backIdiv': NaN,
	'mod': NaN,
	'backMod': NaN,
	'dm': [1, NaN],
	'pow': NaN,
	'backPow': NaN,
	'powLim0': NaN,
	'backPowLim0': NaN,
	'powLim1': NaN,
	'backPowLim1': NaN,
	'logBase': NaN,
	'backLogBase': NaN,
	'bitwiseAnd': -1,
	'bitwiseOr': 0,
	'bitwiseXor': 0,
	'bitwiseLsh': NaN,
	'backBitwiseLsh': NaN,
	'bitwiseRsh': NaN,
	'backBitwiseRsh': NaN,
	'bitwiseUrsh': NaN,
	'backBitwiseUrsh': NaN,
	'lcm': NaN,
	'gcd': 0,
	'least': Infinity,
	'greatest': -Infinity,
	'compare': NaN,
	'abSub': 0,
	'sqSub': NaN,
	'atan2': NaN,
	'hypot': 0,
	'root': NaN,
	'backRoot': NaN,
	'fractionRound': NaN,
	'fractionCeil': NaN,
	'fractionFloor': NaN,
	'fractionTrunc': NaN,
	'factorRound': NaN,
	'factorCeil': NaN,
	'factorFloor': NaN,
	'factorTrunc': NaN,
	'digitRound': NaN,
	'digitCeil': NaN,
	'digitFloor': NaN,
	'digitTrunc': NaN,
	'sadd': '',
	'backSadd': '',
	'ssub': 'N/A',
	'backSsub': 'N/A',
	'smul': 'N/A',
	'backSmul': 'N/A',
	'sdiv': ['N/A'],
	'backSdiv': ['N/A'],
	'pack2': NA,
	'backPack2': NA,
	'toXY': [NaN, NaN],
	'toPolar': [NaN, NaN],
	'and': true,
	'or': false,
	'xor': false,
	'backAnd': true,
	'backOr': false,
	'backXor': false,
	'less': true, // 비교 연산자들은 and를 사용하기 때문에 and 항등원인 true 적용, 다만 CI는 애매해서 NaN 적용
	'leq': true,
	'greater': true,
	'geq': true,
	'equal': true,
	'notEqual': true,
};


// 타입 체크
Number.prototype.isBoolean = function(){return false;};
Number.prototype.isNumber = function(){return true;};
Number.prototype.isString = function(){return false;};
Number.prototype.isArray = function(){return false;};
Number.prototype.isNA = function(){return false;};
Number.prototype.toStringEx = Number.prototype.toString;
Number.prototype.count = function(){return 1;};
Number.prototype.validCount = function(){return 1;};
Number.prototype.strLen = function(){return this.toString().length;};

for(let operator of ARRAY_OPERATORS){
	Number.prototype[operator] = function(...K){return [this][operator](...K);};
};

for(let operator of ALL_OPERATORS){
	if(!Boolean.prototype[operator])
		Boolean.prototype[operator] = Number.prototype[operator];
	if(!String.prototype[operator])
		String.prototype[operator] = Number.prototype[operator];
}

String.prototype.strLen = function(){return this.length;};

String.prototype.knife = function(...indices){ // "hello world".knife(2,-2) = ["he", "llo wor", "ld"]
	let that = this;
	return [...indices, Infinity].map((a,i,A)=>that.slice(A[i-1]??0,a));
};

Boolean.prototype.if = function(runOnTrue, runOnFalse){
	if(this.valueOf()){
		if(typeof runOnTrue == 'function') return runOnTrue();
	}else{
		if(typeof runOnFalse == 'function') return runOnFalse();
	}
};

String.prototype.if = 
Number.prototype.if = function(runOnTrue, runOnFalse){
	if(this.boolean()){
		if(typeof runOnTrue == 'function') return runOnTrue();
	}else{
		if(typeof runOnFalse == 'function') return runOnFalse();
	}
};

Boolean.prototype.concat = Number.prototype.sadd;
Boolean.prototype.repeat = Number.prototype.smul;

Boolean.prototype.isBoolean = function(){return true;};
Boolean.prototype.isNumber = function(){return false;};
Boolean.prototype.isString = function(){return false;};
Boolean.prototype.isArray = function(){return false;};
Boolean.prototype.isNA = function(){return false;};
Boolean.prototype.toStringEx = Boolean.prototype.toString;

String.prototype.splus = function(){return this.valueOf();};
String.prototype.reverse = 
String.prototype.sminus = function () {
  let str = this;
  const length = this.length;
  let temp;
  for(let i = 0; i < Math.floor(length / 2); i++) {
    temp = str[i];
    str = str.substring(0, i) + 
      str.charAt(length - i - 1) +  
      str.substring(i + 1, length - i - 1) + 
      temp + 
      str.substring(length - i);
  }
  return str;
};
String.prototype.sreciproc = function(){return this.split('');};

/*
[문자열 연산 규정]
* 덧셈(sadd)   : 결합 : 'abra' s+ 'cadabra' = 'abracadabra'
* 뺄셈(ssub)   : 삭제 : 'abracadabra' s- 'a' = 'brcdbr'
* 곱셈(smul)   : 반복 : 'abracadabra' s* Math.PI = 'abracadabraabracadabraabracadabraab'
                 소수점을 지정할 수 있음 : 소수 부분은 길이를 곱해서 그만큼 앞에서부터 절단하여 사용
				 예 : 'abcde' s* 0.45 = 'ab' --> 5*0.45 = 2 (반올림 적용)
				 음수를 지정할 수 있음 : 연산 후 모든 문자열을 뒤집음 (음수 규정 적용)
* 나눗셈(sdiv) : 분할 : 'abracadabra' s/ 'r' = ['ab','acadab','a']
* 단, 숫자로 나누면 개수 단위 적용
                 'abracadabra' s/ 3 = ['abr', 'aca', 'dab', 'ra']
                 'abracadabra' s/ -3 = ['ab', 'rac', 'ada', 'bra']
* 양수(splus)  : 그대로 적용 : 문자열로 변환만 함 : +s 10 = '10'
* 음수(sminus) : 뒤집기 : -s 'abracadabra' = 'arbadacarba'
* 역수(sreciproc) : 문자별 분할 : /s 'abracadabra'
- 숫자 등은 모두 문자로 변환하고 배열의 경우 배열 규정 적용
- LISP Infix 에서는 숫자 덧셈보다 낮은 우선순위로 규정


*/
String.prototype.add = function(k){return parseFloat(this)+parseFloat(k);};
String.prototype.repeatEx = function(k){let [i, f] = parseFloat(+k).abs().modf(); f = Math.round(f * this.length); return k>=0?this.repeat(i).concat(this.substr(0,f)) : this.substr(this.length-f).concat(this.repeat(i)).reverse();};

String.prototype.backAdd = function(k){return parseFloat(k)+parseFloat(this);};
String.prototype.concatFrom = function(...K){return K.reverseCopy().join('').concat(this);};
String.prototype.repeatFrom = function(k){return k.toString().repeat(this);};

String.prototype.isBoolean = function(){return false;};
String.prototype.isNumber = function(){return false;};
String.prototype.isString = function(){return true;};
String.prototype.isArray = function(){return false;};
String.prototype.isNA = function(){return false;};
String.prototype.toStringEx = function(){return "'"+this+"'"};

String.prototype.sadd = function(k){return k.isArray() ? [this].sadd(k):this.concat(k);}; // 문자열 덧셈, 결합
String.prototype.backSadd = function(k){return k.isArray() ? [this].backSadd(k):this.concatFrom(k);};
String.prototype.ssub = function(k){return k.isArray() ? [this].ssub(k):this.replaceAll(k,'');}; // 문자열 뺄셈, 모두 제거
String.prototype.backSsub = function(k){return k.isArray() ? [this].backSsub(k):k.toString().replaceAll(this,'');}; // 문자열 뺄셈 역방향
String.prototype.smul = function(k){return k.isArray() ? [this].smul(k):this.repeatEx(k);}; // 문자열 곱셈, 반복
String.prototype.backSmul = function(k){return k.isArray() ? [this].backSmul(k):k.toString().repeatEx(this);};; // 문자열 곱셈, 반복
String.prototype.sdiv = function(k){
	if(k.isArray()) return [this].sdiv(k);
	if(k.isNumber()){
		let arr = [];
		if(k > 0){ // 양수는 앞에서부터
			for(let i=0;i<this.length;i+=k){
				arr.push(this.slice(i,i+k));
			}
		}else if(k < 0){ // 음수는 뒤에서부터
			for(let i=0;i>-this.length;i+=k){
				arr.push(this.slice(i+k,i?i:Infinity));
			}
			arr.reverse();
		}else{ // 0으로 나누는 것은 NaA 반환
			return Array.NaA;
		}
		
		return arr;
	}
	return this.split(k);
}; // 문자열 나눗셈, 분할
String.prototype.backSdiv = function(k){return k.isArray() ? [this].backSdiv(k):k.toString().sdiv(this);};
String.prototype.smod = function(k){return k.isArray() ? [this].smod(k):k>=0?this.slice(0,k):this.slice(k);}; // 문자열 나머지 연산, 앞 또는 뒤 K개 남김
String.prototype.backSmod = function(k){return k.isArray() ? [this].backSmod(k):this>=0?k.toString().slice(0,this):k.toString().slice(k);};
String.prototype.slsh = function(k){return k.isArray() ? [this].slsh(k):this.slice(k).concat(this.slice(0,k));}; // 문자열 나머지 연산, 앞 또는 뒤 K개 남김
String.prototype.backSlsh = function(k){return k.isArray() ? [this].backSlsh(k):k.toString().slice(this).concat(k.toString().slice(0,this));}; // 'abracadabra'
String.prototype.srsh = function(k){return k.isArray() ? [this].srsh(k):this.slice(-k).concat(this.slice(0,-k));}; // 문자열 나머지 연산, 앞 또는 뒤 K개 남김
String.prototype.backSrsh = function(k){return k.isArray() ? [this].backSrsh(k):k.toString().slice(-this).concat(k.toString().slice(0,-this));}; // 'abracadabra'

// 진법 변환, 16진법 및 10진법 한정 소수점 처리 가능
String.prototype.hexToNumber = function(){
	let index = this.indexOf('.'); // 소수점 위치 찾기
	let value = parseInt(this, 16);
	
	if(index == -1) return value; // 소수점 없으면 그대로 반환
	
	let minus = value < 0 || this.trim().charAt(0) == '-';
	
	index++; // 점 뒤로 이동
	let weight = 1/16, digit;
	for(;!isNaN(digit = parseInt(this.charAt(index),16));index++){
		value += minus ? -weight*digit : weight*digit;
		weight /= 16;
	}
	return value;
};
String.prototype.octToNumber = function(){ return parseInt(this, 8); };
String.prototype.binToNumber = function(){ return parseInt(this, 2); };
String.prototype.decToNumber = function(){ return parseFloat(this); };

String.prototype.similarObject = function(k){
	return this == k || this.toLowerCase() == k.toString().toLowerCase();
};
String.prototype.similar = function(k){
	return k.isArray() ? [this].similar(k) : this.toLowerCase() == k.toString().toLowerCase();
};

String.prototype.nextCharCode = function(k){
	if(k == undefined) k = 1;
	return String.fromCharCode(this.charCodeAt() + k);
};

String.prototype.previousCharCode = 
String.prototype.prevCharCode = function(k){
	if(k == undefined) k = 1;
	return String.fromCharCode(this.charCodeAt() - k);
};



String.prototype.for = function(fn){
	for(let i=0;i<this.length;i++){
		fn(this[i]);
	}
};

String.prototype.forConcat = function(fn){
	if(fn == undefined) fn = identical;
	let s = '';
	for(let i=0;i<this.length;i++){
		s = s.concat(fn(this[i]));
	}
	return s;
};

String.prototype.toCapitalize = function(){// getName -> GetName
	return this[0].toUpperCase() + this.slice(1);
};

String.prototype.toDecapitalize = function(){// GetName -> getName
	return this[0].toLowerCase() + this.slice(1);
};

// 프로그래밍 관련 문자열 함수

String.prototype.addCamelPrefix = function(prefix){ // name -> getName
	return prefix.concat(this.toCapitalize());
};

String.prototype.removeCamelPrefix = function(){ // getName -> name
	return this.replace(/^[a-z]*/,'').toDecapitalize();
};

String.prototype.getCamelPrefix = function(){ // getName -> get
	return this.match(/^[a-z]*/,'')[0];
};



///////////////
// 배열 영역 //
///////////////


// 숫자열 생성 함수

Array.numbers = 
Array.makeNumbers = function(start, n, step){ // start부터 n개의 숫자를 step 간격으로
	if(step == undefined) step = 1;
	if(n == undefined) n = start, start = 0;
	n = Math.floor(n);
	return new Array(n??0).fill(0).map((x,i)=>(start)+i*(step));
};

Array.linspace = 
Array.makeLinspace = function(a, b, s){ // a부터 b까지의 숫자를 시작과 끝 포함 s등분함
	return new Array(s).fill(0).map((x,i)=>a+i*(b-a)/(s-1));
};

Array.randoms = 
Array.makeRandoms = function(n){
	return new Array(n).fill(0).map(x=>Math.random());
};

Array.makeDimArray = function(dim, ...dims){
	if(dims.length == 0) return new Array(dim);
	return new Array(dim).fill(Array.makeDimArray(...dims));
};

Array.makeDimArrayFilled = function(what, dim, ...dims){
	if(dims.length == 0) return new Array(dim).fill(what);
	return new Array(dim).fill(Array.makeDimArrayFilled(what, ...dims));
};


// NaA (Not a Array)
Array.NaA = new Array('NaA'); // 문자열 변환 시 NaA 출력하도록...
Array.NaA.NaA = true;
const NaA = Array.NaA;

Array.prototype.isValidArray = function(){
	return !this.NaA;
};

Array.prototype.isBoolean = function(){return false;};
Array.prototype.isNumber = function(){return false;};
Array.prototype.isString = function(){return false;};
Array.prototype.isArray = function(){return true;};
Array.prototype.isNA = function(){return false;};

// 안정적인 계산을 위하여 null 또는 undefined는 모두 NA로 변환
Array.prototype.nullToNA = function(){return this.map(nullToNA);};

// 맵딤

Array.prototype.mapDim = function(fn, ...indices){
	return this.map((x,i)=>x instanceof Array?x.mapDim(fn, ...indices, i):fn(x, ...indices, i));
};

// 선택 실행, (실행여부, 함수명, 매개변수), 실행을 하지 않으면 현재 배열 반환
Array.prototype.optional = function(run_or_survive, what, ...args){
	return run_or_survive ? this[what](...args) : this;
};

// 실수 인덱스 계산 및 백분위수

Array.prototype.floatIndex = function(x){
	let i = Math.floor(x);
	let f = x - i;
	return this[i]*(1-f) + (this[i+1]||0)*f;
};

Array.prototype.percentile = function(p){ // 정렬 되어 있어야 함
	return this.floatIndex(p*(this.length-1)/100);
};

Array.prototype.subArrayR = function(a,b){ // 환형으로 부분 배열을 추출
	if(a<0) a+=this.length;
	if(a+b > this.length)
		return this.slice(a).concat(this.slice(0,b - this.length + a));
	return this.slice(a,a+b);
};


Array.prototype.randomChoice = function(){ // 하나추출
	return this[Math.min(Math.floor(Math.random() * this.length), this.length-1)];
};

Array.prototype.randomChoices = function(n){ // 복원추출
	let that = this;
	return new Array(parseInt(n)).fill(0).map(x=>that.randomChoice());
};

Array.prototype.randomPop = function(){ // 하나 추출 후 빼기, inplace 함수
	let i = Math.min(Math.floor(Math.random() * this.length), this.length-1);
	return this.splice(i, 1)[0];
};

Array.prototype.randomPicks = function(n){ // 비복원추출
	let that = this.map(x=>x);
	return new Array(parseInt(n)).fill(0).map(x=>that.randomPop());
};

Array.prototype.randomShuffle = function(shuffles, wantToCopy){ // 무작위 섞기
	let array = wantToCopy?[...this]:this;
	shuffles ??= Math.ceil(array.length/2);
	for(let i=0;i<shuffles;i++)
		array.sort((a,b) => 0.5 - Math.random());
	return array;
};

Array.prototype.weightedRandomChoice = function(weight){ // 가중치 적용 추출
	let accumRate = weight.rate().accum('add'); // 비율 적용 후 누적 합산
	accumRate[accumRate.length-1] = 1; // 끝은 자동적으로 1로 되지만, 오류가 있을 수 있으므로...
	let picked = accumRate.lookup(Math.random()).ceil(); // 누적은 이미 오름차순이기에 그냥 룩업... 이후 올림 적용, 1 이상이 될 가능성이 없기에 별다른 예외처리 X
	
	return nullToNA(this[picked]); // 결과 반환
};


// 배열 유틸리티
Array.prototype.knife = function(...indices){ // [1,4,2,8,5,7,9].knife(2,5) = [[1,4],[2,8,5],[7,9]]
	let that = this;
	return [...indices, Infinity].map((a,i,A)=>that.slice(A[i-1]??0,a));
};
Array.prototype.indexing = function(...dimIndices){ // [1,4,[2,[8,5]],7,9].indexing(2,1,0) = 8 // a[2][1][0]
	let [[first], rest] = dimIndices.knife(1);
	if(!rest.length) return this[first];
	return this[first].indexing(...rest);
};
Array.prototype.indexForSetValue = function(...dimIndicesAndValue){ // a = [1,4,[2,[8,5]],7,9]; a.indexForSetValue(2,1,0,10); a -> [1,4,[2,[10,5]],7,9] (=)
	let [[first], rest, [value]] = dimIndicesAndValue.knife(1,-1);
	if(!rest.length) return this[first] = value;
	return this[first].indexForSetValue(...rest, value);
};
Array.prototype.indexForSetValueWithOperation = function(...dimIndicesOperatorAndValue){ // a = [1,4,[2,[8,5]],7,9]; a.indexForSetValueWithOperation(2,1,0,'add',10); -> [1,4,[2,[18,5]],7,9] (+=)
	let [[first], rest, [operator], [value]] = dimIndicesOperatorAndValue.knife(1,-2,-1);
	if(!rest.length) return this[first] = this[first][operator](value);
	return this[first].indexForSetValueWithOperation(...rest, operator, value);
};

Array.prototype.slicing = function(start,n,step){ // Python 방식과 달리, end가 아닌 n을 사용, 모든 인자에 소수점 허용됨, 반올림된 인덱스 사용
	start ??= 0;
	n ??= Infinity;
	step ??= 1;
	// 슬라이싱 조정, [1,4,2,8,5,7,9].slicing(3,10,2) -> [[3],[5]] -> [8,7] -> 2개
	if(step > 0){
		n = n.least((this.length - start) / step).precise().ceil();
		let subArray = new Array(n);
		for(let i=0;i<n;i++){
			let I = Math.round(start + i * step).fitInRange(0,this.length-1);
			subArray[i] = this[I];
		}
		return subArray;
	}
	if(step < 0){
		n = n.least(start / -step + 1).precise().floor();
		let subArray = new Array(n);
		for(let i=0;i<n;i++){
			let I = Math.round(start + i * step).fitInRange(0,this.length-1);
			subArray[i] = this[I];
		}
		return subArray;
	}
	return Array.NaA;
};
// 복붙
Array.prototype.copy = function(){ // 복사본 (1차원만 깊은 복사됨)
	return [...this];
};
Array.prototype.superCopy = function(){ // 슈퍼카피, 내부 속까지 깊은 복사함 (완전한 깊은 복사)
	return this.map(x=>x.isArray()?x.superCopy():x);
};

Array.prototype.paste = function(other){ // 내 배열로 붙여넣기
	let that = this;
	this.length = other.length;
	this.length.for(function(i){that[i] = other[i].isArray() ? other[i].superCopy() : other[i];});
	return this;
};
Array.prototype.pasteTo = function(other){ // 다른 배열에게 내 배열을 붙여넣기
	return other.paste(this);
};
// 1차원 정렬 메소드
Array.prototype.ascSort = function(){ //오름차순 정렬 (비파괴적)
	let array = [...this];
	array.sort((a,b)=>a.compare(b));
	return array;
};
Array.prototype.descSort = function(){ // 내림차순 정렬 (비파괴적)
	let array = [...this];
	array.sort((a,b)=>a.compare(b)).reverse();
	return array;
};
Array.prototype.ascSortApply = function(){ // 오름차순 정렬
	return this.sort((a,b)=>a.compare(b));
};
Array.prototype.descSortApply = function(){ // 내림차순 정렬
	return this.sort((a,b)=>a.compare(b)).reverse();
};

/*
<< sortMatrix 메소드 >>

2차원으로 정렬하는 메소드

a = [
	[1,5,6,2],
	[2,5,6,3],
	[9,3,1,4],
	[6,2,8,9],
]

indices = 정렬 순서, ex. [-2,1,-0,3], 숫자는 인덱스, -면 내림차순 정렬하고, +면 오름차순 정렬, -0과 +0 구분함

a.sortMatrix([-2,1,-0,3])

[-2] completed
	[6,2,8,9] OK
	[1,5,6,2]
	[2,5,6,3]
	[9,3,1,4] OK

[1] completed
	[6,2,8,9] OK
	[1,5,6,2]
	[2,5,6,3]
	[9,3,1,4] OK

[-0] completed
	[6,2,8,9] OK
	[2,5,6,3] OK
	[1,5,6,2] OK
	[9,3,1,4] OK

finish!


*/

function _smWithIndi(A,B,indices){
	for(let i of indices){
		let idx = i.abs();
		let desc = i.reciproc() < 0;
		//let dict = i.isString();
		
		if(desc){
			if(A[idx] < B[idx]) return 1;
			if(A[idx] > B[idx]) return -1;
		}else{
			if(A[idx] < B[idx]) return -1;
			if(A[idx] > B[idx]) return 1;
		}
	}
	return 0;
}

Array.prototype.sortMatrix = function(indices){ 
	let current = [...this];
	
	if(indices==undefined) indices = Array.makeNumbers(this[0]?.length??0);
	
	current.sort(function(A,B){
		return _smWithIndi(A,B,indices);
	});
	return current;
};

/*
순위의 계산
.rankMatrix(인덱스, 기준값, 동점일 경우 처리)
방식은 sortMatrix와 동일
기준값(최상위가 받는 값)은 기본 1로 하며,
동점일 경우 처리 기준에 따라 높은 값 1, 평균 0, 낮은 값 -1 로 지정 (기본 1)

a = [
['김민준', 793, 1532],
['권준현', 530, 858],
['오병호', 327, 953],
['이지민', 853, 858],
['임병세', 853, 858],
['조민혁', 853, 858],
['서인우', 892, 858],
];

a.innerAadd(1,a.rankMatrix([-2,-1])).sortMatrix([-2,-1])

[
['김민준',793,1532,1],
['오병호',327,953,2],
['서인우',892,858,3],
['이지민',853,858,4],
['임병세',853,858,4],
['조민혁',853,858,4],
['권준현',530,858,7]
]

a.T()

[
['김민준','권준현','오병호','이지민','임병세','조민혁','서인우'],
[793,530,327,853,853,853,892],
[1532,858,953,858,858,858,858]
]

a.fusion([[], 'mean', 'mean']);

*/

Array.prototype.rankMatrix = function(indices){ 
	let current = this.innerAadd(1, Array.makeNumbers(this.length));
	
	if(indices==undefined) indices = Array.makeNumbers(this[0]?.length??0);
	
	current.sort(function(A,B){
		let sr =  _smWithIndi(A,B,indices);
		if(!sr){
			A.tie = true;
			B.tie = true;
			return 0;
		}
		return sr;
	});
	
	let ranks = new Array(current.length);
	let rank = 1;
	for(let i=0;i<current.length;i++){
		if(!current[i].tie || !current[i-1]?.tie)
			rank = i + 1;
		ranks[current[i][current[i].length-1]] = rank;
	}
	
	return ranks;
};

Array.prototype.sortAndRankMatrix = function(indices){ 
	let current = this.innerAadd(1, Array.makeNumbers(this.length));
	
	if(indices==undefined) indices = Array.makeNumbers(this[0]?.length??0);
	
	current.sort(function(A,B){
		let sr =  _smWithIndi(A,B,indices);
		if(!sr){
			A.tie = true;
			B.tie = true;
			return 0;
		}
		return sr;
	});
	
	let rank = 1;
	for(let i=0;i<current.length;i++){
		if(!current[i].tie || !current[i-1]?.tie)
			rank = i + 1;
		current[i].aaddApply(rank);
	}
	
	return current;
};

// 이진탐색 기법 적용
// .lookup() : 순서에 맞게 룩업함
// .insert() : 순서에 맞게 삽입 (.insertApply() : 현재 배열에 적용)
// 오름차순 기준, insert 메소드는 계속 삽입할 경우 더 이상 정렬을 안해도 되는 장점이 있음

/*

.lookup 메소드는 .indexOf 와는 달리 해당 범위에 있지 않은 경우 그 사이 위치를 반환한다.
단, 오름차순으로 정렬이 되어 있어야 한다. (내부 배열 비허용)
인자에 배열로 줄 경우 여러 개를 지정하여 각각의 위치를 반환함
특히 비어 있으면 [].lookup(x) = -0.5 를 반환 (x에는 어느 값이더라도 동일함)

lookup 반환 범위 : -0.5 ~ .length-0.5, 0.5단위
[10,30,40,60,70].lookup(30) = 1
[10,30,40,60,70].lookup(35) = 1.5
[10,30,40,60,70].lookup(0) = -0.5
[10,30,40,60,70].lookup([30,35]) = [1,1.5]
[10,10,10].lookup(10) = 1
[10,10,10].lookup(11) = 2.5
[10,10,10].lookup(9) = -0.5
[10,10,10]

[10,30,40,60,70].splice(1,0,20) = [10,50,30,40,60,70]

[10,30,40,60,70].insert(50) = [10,30,40,50,60,70]
[10,30,40,60,70].insert([50,80]) = [10,30,40,50,60,70,80]



['apple','banana','melon','vanilla'].lookup('banana') = 1
['apple','banana','melon','vanilla'].lookup('tomato') = 2.5




[10, 30, 40, 60, 70] lookup 과정
what = 35

L = 0, C = 2, R = 4
[10, 30, 40, 60, 70] 40 > 35 (compare 1)

L = 0, C = 0, R = 1
[10, 30            ] 10 < 35 (compare -1)

L = 1, C = 1, R = 1
[    30            ] 30 < 35 (compare -1)

L = 2         R = 1
[    30 35         ]
      1.5


what = 45

L = 0, C = 2, R = 4
[10, 30, 40, 60, 70] 40 < 45 (compare -1)

L = 3, C = 3, R = 4
[            60, 70] 60 > 45 (compare 1)

L = 3         R = 2
[        40  60    ] 60 < 45 (compare 1)
           2.5


what = 5

L = 0, C = 2, R = 4
[10, 30, 40, 60, 70] 40 > 5 (compare 1)

L = 0, C = 0, R = 1
[10, 30            ] 10 > 5 (compare 1)

L = 0         R = -1
[                  ] 10 < 35 (compare -1)
-0.5


[10, 30, 40, 60, 70].lookup([5, 20, 35, 50, 65, 100])


[10, 30, 40, 60, 70].insert(5) = [5, 10, 30, 40, 60, 70] -0.5 => 0
[10, 30, 40, 60, 70].insert(10) = [10, 10, 30, 40, 60, 70] 0 => 0
[10, 30, 40, 60, 70].insert(15) = [10, 15, 30, 40, 60, 70] 0.5 => 1
[10, 30, 40, 60, 70].insert(100) = [10, 30, 40, 60, 70, 100] 4.5 => 5


*/

Array.prototype.lookup = function(what){
	let that = this;
	if(what.isArray()) return what.map(x=>that.lookup(x));
	let left = 0, right = this.length-1, center;
	while(left <= right){
		center = left.center(right).floor();
		switch(this.at(center).compare(what)){
			case -1:// this[center] < what
			left = center + 1; break;
			case 0: // this[center] == what
			return center;
			case 1: // this[center] > what                  
			right = center - 1; break;
			default:
			return this.length-0.5; // NaN은 항상 뒤로 처리
		}                                                   
	}                                                       
	return left.center(right);                              
		
};

Array.prototype.insertApply = function(what){
	let that = this;
	if(what.isArray()){
		what.forEach(x=>that.insertApply(x));
		return this;
	}
	let pos = this.lookup(what).ceil();
	this.splice(pos,0,what);
	return this;
};

Array.prototype.insert = function(what){
	let res = this.copy();
	res.insertApply(what);
	return res;
};



// 행렬 관련 메소드

Array.prototype.aplus = Array.prototype.superCopy;
Array.prototype.aplusApply = function(){return this;};

Array.prototype.aminus = 
Array.prototype.reverseCopy = function(){
	return this.superCopy().reverse();
};
Array.prototype.aminusApply = Array.prototype.reverse;


// 행렬의 전치

Array.prototype.transpose = 
Array.prototype.T = function(){
	let that = this;
	let mincol = Math.min(...this.map(x=>x.isArray()?x.length:that.length));
	
	return new Array(mincol).fill(0).map((x,i)=>that.map(y=>y.isArray()?y[i]:y));
};

// 집계 함수

Array.prototype.booleanObject = 
Array.prototype.someBoolean = function(){ // 하나라도 true가 있는지 확인, 중첩된 경우도 체크함
	return this.some(x=>x.isArray()?x.someBoolean():x.boolean());
};

Array.prototype.everyBoolean = function(){ // 모두 true가 있는지 확인, 중첩된 경우도 체크함
	return this.every(x=>x.isArray()?x.everyBoolean():x.boolean());
};

Array.prototype.truthyCount = function(){
	return this.reduce((z,x)=>x.isArray()?z+x.truthyCount():z+x.boolean(),0);
};

Array.prototype.truthyRate = function(){
	if(!this.length) return NA; // 빈 배열은 하위 평균에서 제외
	return this.map(x=>x.isArray()?x.truthyRate():x.boolean()).mean();
};

Array.prototype.truthyState = function(){ // 1: 모두 참, 0: 일부 참, -1: 모두 거짓
	if(this.everyBoolean()) return 1; // 내부 함수 개선 예정
	if(this.someBoolean()) return 0;
	return -1;
};

/*
[10,20].aadd([30,40]) = [10,20,30,40]
[10,20].aaddInner([30,40]) = [10 a+ 30, 20 a+ 40] = [[10, 30], [20, 40]]
[10,20].aaddInner([[30,40]]) = [10 a+ [30, 40], 20 a+ [30, 40]] = [[10, 30, 40], [20, 30, 40]]
[[10,20],[30,40]].aaddInner([50,60]) = [[10, 20] a+ 50, [30, 40] a+ 60] = [[10,20,50],[30,40,60]]
[[10,20],[30,40]].aaddInner([[50,60]]) = [[10, 20] a+ [50, 60], [30, 40] a+ [50, 60]] = [[10,20,50,60],[30,40,50,60]]
[[10,20],[30,40]].aaddInner([[[50,60]]]) = [[10, 20] a+ [[50, 60]], [30, 40] a+ [[50, 60]]] = [[10,20,[50,60]],[30,40,[50,60]]]
[[10,20],[30,40]].aaddDepth(2,[50,60]) = [[[10,50],[20,60]],[[30,50],[40,60]]]
[[10,20],[30,40]].aaddDepth(2,[[50,60]]) = [[[10,50,60],[20,50,60]],[[30,50,60],[40,50,60]]]
cf. [10,20].pack2([30,40]) = [[10,30],[20,40]]

*/

// 배열 연산자
Array.prototype.aadd = Array.prototype.concat; // [10,20] a+ [30,5] = [10,20,30,5]
Array.prototype.aaddApply = function(other){
	if(other.isArray())
		this.push(...other);
	else
		this.push(other);
	return this;
};

Array.prototype.aaddLeft = Array.prototype.concat; // [10,20] a+ [30,5] = [10,20,30,5]
Array.prototype.aaddLeftApply = function(other){
	if(other.isArray())
		this.unshift(...other);
	else
		this.unshift(other);
	return this;
};


/*
집합 연산자, equalOp는 일치 조건 설정 (siminar, equal, identical, [equalEO와 identicalEO는 추후 예정])

일치표를 통해서 간단하게 계산할 수 있음

setDifference intersection union symmetricDifference
*/

Array.prototype.setDifference = 
Array.prototype.asub = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	let rows = eqTable.innerOr();
	//let cols = eqTable.or();
	
	return this.mask(rows.not());
};

Array.prototype.intersection = 
Array.prototype.aand = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	let rows = eqTable.innerOr();
	//let cols = eqTable.or();
	
	return this.mask(rows);
};

Array.prototype.union = 
Array.prototype.aor = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	//let rows = eqTable.innerOr();
	let cols = eqTable.or();
	
	return this.aadd(other.mask(cols.not()));
};

Array.prototype.symmetricDifference = 
Array.prototype.axor = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	let rows = eqTable.innerOr();
	let cols = eqTable.or();
	
	return this.mask(rows.not()).aadd(other.mask(cols.not()));
};


Array.prototype.amul = function(k){ // [10,20] a* 2.5 = [10,20,10,20,10]
	let [i, f] = parseFloat(+k).abs().modf();
	f = f.mul(this.length).precise().round();
	if(k > 0)
		return Array(i).fill(this).flat().concat(this.slice(0,f));
	else
		return Array(i).fill(this).flat().reverse().concat(this.slice(-f).reverse());
};

Array.prototype.amod = function(k){ // [1,4,2,8,6] a% 3 = [1,4,2], [1,4,2,8,6] a% -2 = [8,6]
	return k >= 0 ? this.slice(0,k) : this.slice(k);
};

Array.prototype.alsh = function(k){
	k ??= 1;
	return this.slice(k).concat(this.slice(0,k));
}; // 왼쪽으로 밀기, [1,4,2,8,6] a<< 2 = [2,8,6,1,4]

Array.prototype.arsh = function(k){
	k ??= 1;
	return this.slice(-k).concat(this.slice(0,-k));
}; // 오른쪽으로 밀기 [1,4,2,8,6] a>> 2 = [8,6,1,4,2]



//[1,7,3,1,9,1,10,9,8].unique()     = [1,7,3,9,10,8] // 중복되는 것은 첫째만
//[1,7,3,1,9,1,10,9,8].unique(true) = [7,3,1,10,9,8] // 중복되는 것은 마지막만
Array.prototype.unique = function(isLastKeep, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	let eqTable = this.matrix(equalOp);
	let mask = [true].amul(this.length);
	
	for(let r=1;r<this.length;r++){
		for(let c=0;c<r;c++){
			if(eqTable[r][c]) mask[isLastKeep ? c : r] = false;
		}
	}
	
	return this.mask(mask);
};

/*
Array.prototype.mode = function(equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	
	for(let r=1;r<this.length;r++){
		for(let c=0;c<r;c++){
			if(eqTable[r][c]) mask[r] = false;
		}
	}
	
	return this.mask(mask);
};
*/


Array.prototype.afmt = function(other){ // [1025,2007,304] a# [',d', '; ', '(', ')'] = '(1,025; 2,007; 304)' (string format 참조)
	return NA;
};


/*
각 배열 성분끼리 곱셈을 시행한 후 덧셈 시행
[40,60,58,37].sumprod([32,29,65,81]).toStringEx() = 9787 = 40*32+60*29+58*65+37*81
*/

Array.prototype.sumprod = function(other){
	return this.mul(other??this).sum();
};

/*
공분산
[40,60,58,37].covar([32,29,65,81]) = -76.0625
*/

Array.prototype.covar = function(other){
	other ??= this;
	return this.sub(this.mean()).sumprod(other.sub(other.mean())).div(this.cardinality());
};





/*

if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	if(other.isArray()){
		if(this.length != other.length){
			// 어느 한 쪽 길이가 1이면, Broadcasting
			if(this.length == 1) return other.map((a,i)=>that[0][operator](a)); //Broadcasting 
			if(other.length == 1) return this.map((a,i)=>a[operator](other[0])); //Broadcasting 
			// 아니면 NaA 반환
			return Array.NaA;
		}
		return this.map((a,i)=>a[operator](other[i]));
	}
	return this.map(a=>a[operator](other));
*/

/*
마스크 함수

* 규정 *
scalar mask boolean :: true : 추가, false : 제외
scalar mask array   :: array 내부에서 true만 그만큼 똑같은 scalar 추가 (재귀 적용), 모두 false면 빈 배열 추가
array  mask boolean :: true : 통째로 추가, false : 통째로 제외
array  mask array   :: 재귀 적용, 이후 해당 결과 적용 (무조건 추가)
# .mask(false) 호출 :: 빈 배열([]), .mask(true) 호출 : 해당 배열 그대로 복사본 반환

* 예제 *
[1,2,3].mask([false,true,true]) = [2,3]

[1,[2,3,4],5].mask([false,[true],true]) = [[2,3,4],5]
[1,[2,3,4],5].mask([false,[false],true]) = [[],5]
[1,[2,3,4],5].mask([false,true,true]) = [[2,3,4],5]
[1,[2,3,4],5].mask([false,false,true]) = [5]

[1,2,3].mask([false,[false,true,false],true]) = [[2],3]
[1,2,3].mask([false,[false,true,true],true]) = [[2,2],3]
[1,[2],3].mask([false,[false,true,true],true]) = [[2,2],3]
[1,[2],3].mask([false,[false,true,[true]],true]) = [[2,[2]],3]

해당 사항 제외시 .mask([~].not()) 을 적용함

*/

Array.prototype.mask = function(logical){
	if(this.NaA) return Array.NaA;
	if(logical.NaA) return Array.NaA;
	
	let result = [];
	let that = this;
	
	if(logical.isArray()){
		if(this.length != logical.length && this.length != 1 && logical.length != 1){
			// Broadcasting 불가 조건 
			return Array.NaA;
		}
		let tlen = this.length, llen = logical.length, len = tlen.greatest(llen);
		len.for(function(i){
			if(that[i % tlen].isArray()){
				if(logical[i % llen].isArray()) // 둘 다 배열이면 추가하되 재귀한 결과를 삽입
					result.push(that[i % tlen].mask(logical[i % llen]));
				// 논리값이 스칼라이면 그 여부에 따라 추가 (통째 처리)
				else if(logical[i % llen].boolean())
					result.push(that[i % tlen]);
			}else if(logical[i % llen].isArray()){ // 원본 값이 스칼라면 괄호를 씌워 생각
				result.push([that[i % tlen]].mask(logical[i % llen]));
			}else if(logical[i % llen].boolean()){ // 모두 스칼라
				result.push(that[i % tlen]);
			}
		});
		return result;
	}
	return logical.boolean() ? this : [];
};

Array.prototype.if = function(a1, a2, a3){
	if(typeof a3 == 'function'){ // 3단법, 모두참-일부참-거짓
		return [a3,a2,a1][this.truthyState()+1]();
	}else if(typeof a2 == 'function'){ // 2단법, 모두참-하나라도거짓
		return this.everyBoolean() ? a1() : a2();
	}else if(typeof a1 == 'function' && this.everyBoolean()){ // 모두 참이여만 실행
		return a1();
	}
};


// N/A처리함수 (오류로 발생한 NaA 등은 N/A가 아님!)
Array.prototype.count = function(){
	return this.length;
};
Array.prototype.innerCount = function(){
	return this.map(x=>x.count()); // * 모든 객체에 count 속성 삽입, string 객체는 length와 달리 1을 반환
};
Array.prototype.superCount = function(){
	return this.reduce((x,y)=>y.isArray()?x+y.superCount():x+1,0);
};

Array.prototype.isExistNA = function(){
	return this.some(x=>x.isNA());
};
Array.prototype.naCount = function(){
	return this.filter(x=>x.isNA()).length;
};
Array.prototype.validCount = function(){ // 유효한 개수
	return this.filter(x=>!x.isNA()).length;
};
Array.prototype.checkValidElement = function(){ // 2차원 이상인 경우 사용, [[1,4],[2,8],[NA,7],6] 의 경우 [3,4] 가 적용됨 [1,2,NA,6]=>3, [[1],[2],[NA],[6]]=>[3]
	return this.map(x=>x.isArray()?x.checkValidElement():!x.isNA());
}; // [[1,4],[2,8],[NA,7],6].checkValidElement() = [[true,true],[true,true],[false,true],true]
Array.prototype.cardinality = function(){ // 평균 등의 계산을 위해서 각 가지별로 개수를 구함, Broadcasting Rule 규정 적용
	return this.checkValidElement().sum();
};
//[[1,1],[1,1],[0,1],1].addReduce();
Array.prototype.naRate = function(){
	return this.filter(x=>x.isNA()).length / this.length;
};
Array.prototype.dropNA = function(){
	return this.filter(x=>!x.isNA());
};
Array.prototype.dropNAApply = function(){
	return this.paste(this.dropNA());
};
Array.prototype.dropEmpty = function(){
	return this.filter(x=>!x.isNA() && (!x.isArray() || x.length));
};
Array.prototype.dropEmptyApply = function(){
	return this.paste(this.dropEmpty());
};
Array.prototype.fillNA = function(k){
	if(typeof k == 'function')
		return this.map((x,i,A)=>x.isNA()?k(i,A):x);
	return this.map(x=>x.isNA()?k:x);
};




// Array.prototype.boolean


/*
[
	[1,3,2],
	[7,0,9],
	[-1,8,4],
]
=>
[
	[1,7,-1],
	[3,0,8],
	[-1,8,4],
]

=> [7,11,15]

*/

// 배열 연산

Array.prototype._unaryOp = function(operator){
	if(this.NaA) return Array.NaA;
	
	return this.map(a=>a[operator]());
};

Array.prototype._unaryAp = function(operator){
	if(this.NaA) return this;
	
	this.forEach((a,i,A)=>A[i]=a[operator+(a.isArray()?'Apply':'')]());
	return this;
};

Array.prototype.opReduce = function(operator, isRight){
	if(this.NaA || !this.length) return Number.identities[operator]; // 빈 배열은 항등원 반환
	switch(this.length){
		case 0: return Number.identities[operator];
		case 1: 
		
		switch(CONTINUOUSELY_COMPARE[operator] || operator){
			case true:
			return true;
			case 'compare':
			return NaN;
			default:
			return this[0];
		}
		case 2: return isRight ? this[1][operator](this[0]) : this[0][operator](this[1]);
		default:
		// 10>5>3>1 정상은 true, JS식 계산 10>5=true, 1>3=false, 0>1=false -> false
		// less, leq, greater, geq, equal, notEqual 연산자는 수학적 규칙에 따라 그전의 항에 따라서 판별함
		// (and를 사용, 이미 거짓이 확정된 경우 상관없이 계속 false 처리) 
		// 그외는 왼쪽에서 오른쪽으로 연산 (반대편 연산은 RTL, 역방향 연산은 rev-)
		// notEqual의 경우 모두 다 다름을 의미하지 않음. 3!=5!=3 은 Python에서도 True로 판정
		
		// Compare Indicator의 경우는 다음과 같은 특례를 적용함
		// 부호가 증감과 다른 이유 : compare() 특성 반영
		//
		// -1, -0.5, 0, 0.5, 1, NaN 으로 처리함
		//  a              b =    -1    0    1
		//  1.5 : 초기상태      -1      0    1
		
		// -1   : 순증가        -1   -0.5  NaN
		// -0.5 : 단조증가      -0.5 -0.5  NaN
		//  0   : 보합          -0.5    0  0.5
		//  0.5 : 단조감소       NaN  0.5  0.5
		//  1   : 순감소         NaN  0.5  1
		
		//  NaN : 증가/감소혼합  NaN  NaN  NaN (모두 다 다름을 의미하지 않음)
		// [3,5,7].compare() = -1
		// [3,5,5].compare() = -0.5
		// [3,5,3].compare() =  NaN
		// [3,3,3].compare() =  0
		// [3,2,2].compare() =  0.5
		// [3,2,1].compare() =  1
		
		switch(CONTINUOUSELY_COMPARE[operator] || operator){
			case true:
			if(isRight) return this.reduceRight((a,b,i,A)=>(i==A.length-2?true:a).and(A[i+1][operator](b)));
			return this.reduce((a,b,i,A)=>(i==1?true:a).and(A[i-1][operator](b)));
			
			case 'compare':
			if(isRight) return this.reduceRight((a,b,i,A)=>(i==A.length-2?1.5:a)._citrans(A[i+1][operator](b)));
			return this.reduce((a,b,i,A)=>(i==1?1.5:a)._citrans(A[i-1][operator](b)));
			
			default:
			return this[isRight?'reduceRight':'reduce']((a,b)=>a[operator](b));
		}
		
	}
}

Array.prototype._binaryOp = function(operator, other){
	if(other === undefined){ // 지정하지 않은 경우 리듀싱으로 계산함
		return this.opReduce(operator, false);
	}
	
	if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	if(other.isArray()){
		if(this.length != other.length){
			// 어느 한 쪽 길이가 1이면, Broadcasting
			if(this.length == 1) return other.map((a,i)=>that[0][operator](a)); //Broadcasting 
			if(other.length == 1) return this.map((a,i)=>a[operator](other[0])); //Broadcasting 
			// 아니면 에러 처리함
			throw new BroadcastingError(this.length+' vs '+other.length+' (only allow 1vsN, Nvs1, NvsN), Evaluate All Cases : '+operator+'Cartesian(y) etc.');
		}
		return this.map((a,i)=>a[operator](other[i]));
	}
	return this.map(a=>a[operator](other));
};

/*
카르테시언 연산
[1,2,3].addCartesian([4,5]) = [1+4,1+5,2+4,2+5,3+4,3+5] = [5,6,6,7,7,8] :: 오른쪽 우선
[1,2,3].addLeftCartesian([4,5]) = [1+4,2+4,3+4,1+5,2+5,3+5] = [5,6,7,6,7,8] :: 왼쪽 우선
리스트로 원한다면 Cartesian 없이 사용 가능
[1,2,3].add([[4,5]]) = [1+[4,5],2+[4,5],3+[4,5]] = [[1+4,1+5],[2+4,2+5],[3+4,3+5]] = [[5,6],[6,7],[7,8]]
[[1,2,3]].add([4,5]) = [[1,2,3]+4,[1,2,3]+5] = [[1+4,2+4,3+4],[1+5,2+5,3+5]] = [[5,6,7],[6,7,8]]
*/

Array.prototype._binaryCar = function(operator, other){
	if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	
	if(other.isArray()){
		let res = new Array(this.length * other.length);
		this.forEach((a,i)=>other.forEach((b,j)=> res[i*other.length+j] = this[i][operator+(a.isArray()?'Cartesian':'')](other[j])));
		return res;
	}
	return this.map(a=>a[operator+(a.isArray()?'Cartesian':'')](other));
};

Array.prototype._binaryLeftCar = function(operator, other){
	if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	
	if(other.isArray()){
		let res = new Array(this.length * other.length);
		other.forEach((a,i)=>this.forEach((b,j)=> res[i*this.length+j] = this[j][operator+(a.isArray()?'LeftCartesian':'')](other[i])));
		return res;
	}
	return this.map(a=>a[operator+(a.isArray()?'LeftCartesian':'')](other));
};


/*
a = [[3,[9]], [4,5],[7,9], 11];
a.addApply([3,1,4,-2]);          // [[6,[12]],[5,6],[11,13],9]
a.addApply([3,[1,2],4,[-2,-3]]); // [[9,[15]],[6,8],[15,17],[7,6]]

a.toStringEx();
*/

Array.prototype._binaryAp = function(operator, other){ // 복합대입 (addApply 등)
	if(this.NaA) return this;
	if(other.NaA) return this;
	
	
	let that = this;
	if(other.isArray()){
		if(this.length != other.length){
			// 어느 한 쪽 길이가 1이면, Broadcasting
			if(this.length == 1){
				this[0] = other.map((a,i,A)=>that[0][operator+'Apply'](a)); //Broadcasting 
				return this;
			}
			if(other.length == 1){
				this.forEach((a,i,A)=>A[i]=a[operator+(a.isArray()?'Apply':'')](other[0])); //Broadcasting 
				return this;
			}
			// 아니면 NaA 반환
			this.NaA = true; // NaA 처리하고
			this.length = 0; // 전부 삭제
			return this;
		}
		this.forEach((a,i,A)=>A[i]=a[operator+(a.isArray()?'Apply':'')](other[i]));
		return this;
	}
	this.forEach((a,i,A)=>A[i]=a[operator+(a.isArray()?'Apply':'')](other));
	return this;
};

Array.prototype._ternaryOp = function(operator, other, ...args){ // 3항 이상은 2항까지 배열 허용
	
	if(this.NaA) return Array.NaA;
	
	if(other!==undefined){
		
		if(other.NaA) return Array.NaA;
		
		let that = this;
		if(other.isArray()){
			if(this.length != other.length){
				// 어느 한 쪽 길이가 1이면, Broadcasting
				if(this.length == 1) return other.map((a,i)=>that[0][operator](a, ...args)); //Broadcasting 
				if(other.length == 1) return this.map((a,i)=>a[operator](other[0], ...args)); //Broadcasting 
				// 아니면 에러 처리함
				throw new BroadcastingError(this.length+' vs '+other.length+' (only allow 1vsN, Nvs1, NvsN), Evaluate All Cases : '+operator+'Cartesian(y) etc.');
			}
			return this.map((a,i)=>a[operator](other[i], ...args));
		}
	}
	return this.map(a=>a[operator](other, ...args));
	
};

Array.prototype._ternaryAp = function(operator, ...args){
	if(this.NaA) return this;
	
	this.forEach((a,i,A)=>A[i]=a[operator+(a.isArray()?'Apply':'')](...args));
	return this;
};


for(let operator of UNARY_OPERATORS){
	if(Array.prototype[operator] == undefined){
		Array.prototype[operator] = function(){
			return this._unaryOp(operator);
		};
		Array.prototype[operator+'Apply'] = function(){
			return this._unaryAp(operator);
		};
		
	}
}

for(let operator of BINARY_OPERATORS){
	if(Array.prototype[operator] == undefined){
		Array.prototype[operator] = function(other){
			return this._binaryOp(operator, other);
		};
		Array.prototype[operator+'Apply'] = function(other){
			return this._binaryAp(operator, other);
		};
		Array.prototype[operator+'Cartesian'] = function(other){
			return this._binaryCar(operator, other);
		};
		Array.prototype[operator+'LeftCartesian'] = function(other){
			return this._binaryLeftCar(operator, other);
		};
	}
}

for(let operator of TERNARY_OPERATORS){
	if(Array.prototype[operator] == undefined){
		Array.prototype[operator] = function(...args){
			return this._ternaryOp(operator, ...args);
		};
		Array.prototype[operator+'Apply'] = function(...args){
			return this._ternaryAp(operator, ...args);
		};
	}
}

// 한 요소 간의 해당 여부 연산
//
// isOdd, isEven, isPrime, isPositive, isNegative, isZero, isNaN, isFinite
// is 접두어가 제거됨
//
// [해당 여부]
// a = [10, 20, 31, 43] 에서
//
// a.someEven()      :  true
// a.everyEven()     : false
// a.countOfEven()   :     2
// a.rateOfEven()    :   0.5
// * 세부 배열이 있는 경우, 해당 세부 배열을 먼저 계산하고 이를 포함하여 나머지 진리값과 취합하여 반영

// 두 요소 간의 비교 연산
//
// 일반 비교 : less, greater, leq, geq, equal, notEqual, identical, notIdentical
// 수의 성질 비교 : coprime
// 
// a = [1,4,3,5,7,6] 에서
//
// [해당 여부]
// a.someLess(5)       :  true  -> 5보다 작은 요소 적어도 하나 이상 존재
// a.everyLess(5)      : false  -> 5보다 작은 요소 모두 존재
// a.countLess(5)      :     3  -> 5보다 작은 요소의 개수
// a.rateLess(5)       :   0.5  -> 전체 대비 5보다 작은 요소의 개수에 대한 비율
// a.stateLess(5)      :     0  -> 해당 여부 반환, 1:전부 해당, 0:일부 해당, -1:전부 해당되지 않음 (인디케이터 연산은 -1, 0, 1, NaN 으로 구성)
// * 세부 배열이 있는 경우, 해당 세부 배열을 먼저 계산하고 이를 포함하여 나머지 진리값과 취합하여 반영
//
// [해당 요소 제외/포함]
// a.onlyLess(5)       : [1,4,3] -> 5보다 작은 요소만 포함
// a.excludeLess(5)    : [5,7,6] -> 5보다 작은 요소 제외
// * 세부 배열도 전파하여 적용
//
// 해당 여부를 모두 보려면 개발자 모드에서 a.describe(~~) 를 통하여 조회 가능
// NA를 포함해서 계산되므로 주의! 필요 시 dropNA 를 먼저 실행 권장
//
//  

for(let operator of UNARY_CHECK_OPERATORS){
	Array.prototype[operator.addCamelPrefix('some')] = function(){
		let res = this[operator]();
		return res.NaA ? false : res.someBoolean();
	};
	Array.prototype[operator.addCamelPrefix('every')] = function(){
		let res = this[operator]();
		return res.NaA ? false : res.everyBoolean();
	};
	Array.prototype[operator.addCamelPrefix('rate')] = function(){
		let res = this[operator]();
		return res.NaA ? NaN : res.truthyRate();
	};
	Array.prototype[operator.addCamelPrefix('count')] = function(){
		let res = this[operator]();
		return res.NaA ? NaN : res.truthyCount();
	};
	Array.prototype[operator.addCamelPrefix('state')] = function(){
		let res = this[operator]();
		return res.NaA ? NaN : res.truthyState();
	};
	Array.prototype[operator.addCamelPrefix('only')] = function(){
		let logical = this[operator]();
		return logical.NaA ? Array.NaA : this.mask(logical);
	};
	Array.prototype[operator.addCamelPrefix('exclude')] = function(){
		let logical = this[operator]().not();
		return logical.NaA ? Array.NaA : this.mask(logical);
	};
	
	
	
}

for(let operator of BINARY_COMPARE_OPERATORS){
	
	Array.prototype[operator.addCamelPrefix('some')] = function(other){
		let res = this[operator](other);
		return res.NaA ? false : res.someBoolean();
	};
	Array.prototype[operator.addCamelPrefix('every')] = function(other){
		let res = this[operator](other);
		return res.NaA ? false : res.everyBoolean();
	};
	Array.prototype[operator.addCamelPrefix('rate')] = function(other){
		let res = this[operator](other);
		return res.NaA ? NaN : res.truthyRate();
	};
	Array.prototype[operator.addCamelPrefix('count')] = function(other){
		let res = this[operator](other);
		return res.NaA ? NaN : res.truthyCount();
	};
	Array.prototype[operator.addCamelPrefix('state')] = function(other){
		let res = this[operator](other);
		return res.NaA ? NaN : res.truthyState();
	};
	Array.prototype[operator.addCamelPrefix('only')] = function(other){
		let logical = this[operator](other);
		return logical.NaA ? Array.NaA : this.mask(logical);
	};
	Array.prototype[operator.addCamelPrefix('exclude')] = function(other){
		let logical = this[operator](other).not();
		return logical.NaA ? Array.NaA : this.mask(logical);
	};
	
	
	
}

for(let operator of TERNARY_COMPARE_OPERATORS){
	Array.prototype[operator.addCamelPrefix('some')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? false : res.someBoolean();
	};
	Array.prototype[operator.addCamelPrefix('every')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? false : res.everyBoolean();
	};
	Array.prototype[operator.addCamelPrefix('rate')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? NaN : res.truthyRate();
	};
	Array.prototype[operator.addCamelPrefix('half')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? false : res.truthyRate() >= 0.5;
	};
	Array.prototype[operator.addCamelPrefix('overHalf')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? false : res.truthyRate() > 0.5;
	};
	Array.prototype[operator.addCamelPrefix('count')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? NaN : res.truthyCount();
	};
	Array.prototype[operator.addCamelPrefix('state')] = function(...args){
		let res = this[operator](...args);
		return res.NaA ? NaN : res.truthyState();
	};
	Array.prototype[operator.addCamelPrefix('only')] = function(...args){
		let logical = this[operator](...args);
		return logical.NaA ? Array.NaA : this.mask(logical);
	};
	Array.prototype[operator.addCamelPrefix('exclude')] = function(...args){
		let logical = this[operator](...args).not();
		return logical.NaA ? Array.NaA : this.mask(logical);
	};
	
}



// 범위 내 데이터값 존재 여부

// array.inRange(3, 11, '[)') 형식, [3, 11) 을 의미함 (3이상 11미만), boundary 없으면 폐구간([]) 으로 간주
// every와 some도 제공하며, 일반은 각 배열 요소 별로 true, false 반환


// .wrap() : .pack1() 와는 달리 전체를 묶음
Array.prototype.wrap = function(){return [this];};

// .tag() : 배열에 태그를 달거나 설정 가능
// .setTag() 도 같게 만들었는데, 이건 innerSetTag() 에서 차이가 발생함, 각각 태그 설정 가능
Array.prototype.setTag = function(v){
	this.tag = v;
	return this;
};

Array.prototype.getTag = function(v){
	return nullToNA(this.tag);
};


/*
깊이 연산 가능 * 해당 깊이에 도달하지 않을 시 해당 값 유지

[[1,4],[2,[3,5]]].innerAdd(0).toStringEx() = [3,[7,9]] = [1,4]+[2,[3,5]]
[[1,4],[2,[3,5]]].innerAdd(1).toStringEx() = [5,[5,7]] = [1+4, 2+[3,5]]
[[1,4],[2,[3,5]]].innerAdd(2).toStringEx() = [[1,4],[2,8]] = [[1,4],[2,3+5]]

[[1,4],[2,[3,5]]].innerAccum(0,'add').toStringEx() = [[1,4],[3,[7,9]]]
[[1,4],[2,[3,5]]].innerAccum(1,'add').toStringEx() = [[1,5],[2,[5,7]]]
[[1,4],[2,[3,5]]].innerAccum(2,'add').toStringEx() = [[1,4],[2,[3,8]]]

[[1,4],[2,[3,5]]].innerNear(0,'add').toStringEx() = [[3,[7,9]]]
[[1,4],[2,[3,5]]].innerNear(1,'add').toStringEx() = [[5],[[5,7]]]
[[1,4],[2,[3,5]]].innerNear(2,'add').toStringEx() = [[[],[]],[[],[8]]]


*/

// Lisp 함수


/*
.pick(), : 인덱스를 적용하여 필요한 일부만 계산, 속도 향상

.at() 은 Native 명령어이므로 .pick() 사용

인덱싱 방법
.pick()                 // a
.pick(3)                // a[3]
.pick(3,2)              // a[3][2] 의 요소 뽑아냄 (주의 .pick([[3,2]]) 는 [a[3][2]] 임)
.pick(ALL,3,2)          // Python의 a[:,3,2] 와 같은 개념, 가장 겉의 배열 기준으로 하나하나씩 [3][2] 호출, 즉 [a[0][3][2], a[1][3][2], ...]
.pick([3,2])            // [a[3], a[2]]
.pick([[3,2],[2,3]])    // [a[3][2],a[2][3]]
.pick(ALL,[[3,2],[2,3]])// [[a[0][3][2], a[0][2][3]], [a[1][3][2], a[1][2][3]], ...]

// Range Indexing
.sliceEx([0,3,2],[2,5,4])  // a[0:2][3:5][2:4] // 3차원
.sliceEx([0,3,2],[2,false,4])  // a[0:2][3][2:4]  // 2차원
.sliceEx([0,3,2],[2,false,-0])  // a[0:2][3][2:]  // -0과 0은 구별됨 주의
*/

/*
Array.prototype._singleIndexing = function(indices_array){
	let [i, J] = indices_array.knife(1);
	return J.length ? this.at(i)._singleIndexing(J) : this.at(i);
};
Array.prototype._fancyIndexing = function(indices_array){
	let that = this;
	return indices_array.map(x=>x.isArray()?that._singleIndexing(x):that[x]);
};
Array.prototype.sliceEx = function(start_indices, end_indices){
	if(start_indices.length != end_indices.length){
		throw new Error('Range Size Mismatch!!');
	}
	let [a, A] = start_indices.knife(1);
	let [b, B] = start_indices.knife(1);
	if(1/b == Infinity) b = this.length; // +0
	a = a.fitInRange(0, this.length);
	b = b.fitInRange(0, this.length);
	
	let res = [];
	for(let i=a;i<b;i++){
		res.push(A.length ? this[i]._rangeIndexing(A,B) : this[i]);
	}
	return res;
};
*/


Array.prototype.pick = function(idx, ...cdr){
	let that = this;
	if(idx === undefined) return this;
	if(idx.isArray()){ // Fancy Indexing
		if(cdr.length)
			return idx.map(x=>x.isArray()?that.pick(...x).pick(...cdr):that.at(x).pick(...cdr));
		else
			return idx.map(x=>x.isArray()?that.pick(...x):that.at(x));
	}
	if(idx === true || idx === ':'){
		if(cdr.length)
			return this.map(x=>x.pick(...cdr));
		else
			return this; // this.map(x=>x);
	}
	
	if(!idx.inRange(-this.length, this.length, '[)')) throw new ArrayBoundaryError("Array index out of range: idx.inRange(" + (-this.length) + ", " + this.length + ", '[)') = false!!!");
	
	if(cdr.length)
		return this.at(idx).pick(...cdr);
	else
		return this.at(idx);
	/*
	let that = this;
	if(depth === undefined){ // .pick()
		return this;
	}
	if(indices.length == 0){ // .pick(3)
		return this.at(depth); 
	}
	
	if(depth.isArray()){ // .pick([~]) -> .pick(0, [~])
		indices = [depth, ...indices];
		depth = 0;
	}
	
	if(depth >= 1)
		return this.map(x=>x.isArray()?x.pick(depth-1, ...indices));
	
	if(indices[0] !== undefined){ // Range Indexing
		return this._rangeIndexing(depth, indices[0]);
	}else{ // Single Indexing
		return this._singleIndexing();
	}
	*/
	
};

Array.prototype.sliceEx = function(start_indices, end_indices){
	if(start_indices.length != end_indices.length){
		throw new Error('Range Size Mismatch!!');
	}
	let [[a], A] = start_indices.knife(1);
	let [[b], B] = end_indices.knife(1);
	if(b === false){
		return this.at(a);
	}
	if(1/b == -Infinity) b = this.length; // -0
	
	if(A.length) return this.slice(a,b).map(x=>x.sliceEx(A,B));
	return this.slice(a,b);
};


/*
배열의 이진 연산은 다양한 연산을 제공한다.
NumPy 에서도 해당 기능 이용 가능!

[예제]
a = [[[1,4,3],[6,5,8],[7,2,9]],[[3,6,2],[0,9,8],[-1,10,2]]]
a = np.array(a) # Python

b = [1,4,3,5,7]
c = [2,0,-1,4]

Number.identities.add  <=> np.add.identity [=0, mul(tiply) 의 경우는 =1]
a.sub(b)               <=> np.subtract(a,b)
a.sub()                <=> np.subtract.reduce(a)
a.innerSub()           <=> np.subtract.reduce(a, axis=1)
a.innerSub(2)          <=> np.subtract.reduce(a, axis=2)
a.accum('sub')         <=> np.subtract.accumulate(a)
a.innerAccum(1,'sub')  <=> np.subtract.accumulate(a, axis=1)
a.innerAccum(2,'sub')  <=> np.subtract.accumulate(a, axis=2)
b.matrix('sub')        <=> np.subtract.outer(b,b)
b.matrix('sub',c)      <=> np.subtract.outer(b,c)
b.subRTL()             <=> np.subtract.reduce(b[::-1])
b.accum('sub',RTL)     <=> np.subtract.accumulate(b[::-1])[::-1]
a.superReduce('sub')   <=> A = a; for _ in a.shape: A = np.subtract.reduce(A)

*/

/*
 inner 메소드, 깊이를 정하고, 연산할 메소드 (또는 람다식), 그리고 파라미터를 지정함
 깊이에 따라서 연산 방법이 달라짐
 두 배열간의 요소간 연산은 innerBinary 을 사용
 
 [예제]
 a = [[10,20,25],[37,60,28]];
 a.inner(0, x=>x+3).toStringEx(); // '10,20,25,37,60,283'
 a.inner(1, x=>x+3).toStringEx(); // ['10,20,253','37,60,283']
 a.inner(2, x=>x+3).toStringEx(); // [[13,23,28],[40,63,31]]
 a.inner(3, x=>x+3).toStringEx(); // [[[13],[23],[28]],[[40],[63],[31]]]
 a.inner(2, 'toString', 16).toStringEx(); // [['a','14','19'],['25','3c','1c']]
 a.inner(2, 'combined', ['toString:', 16], 'toUpperCase').toStringEx(); // [['A','14','19'],['25','3C','1C']]
 
 
*/

Array.prototype.inner = function(depth, operator, ...params){
	depth ??= 1;
	
	if(depth >= 2)
		return this.map(a=>(a.isArray()?a:[a]).inner(depth-1, operator, ...params));
	
	if(typeof operator == 'function'){ // Lambda
		if(depth >= 1)
			return this.map(a=>operator(a, ...params));
		return operator(this, ...params);
	} // Method
	
	if(depth >= 1)
		return this.map(a=>a[operator](...params));
	return this[operator](...params);
};



/*
if(this.length == 0) return Number.identities[operator];
		if(this[0].isArray())
			return this.slice(1)[isRight?'reduceRight':'reduce']((a,b)=>b.isArray()?
				a[operator](b[superOperator](isRight)) : a[operator](b), this[0][superOperator](isRight));
		return this[isRight?'reduceRight':'reduce']((a,b)=>b.isArray()?
			a[operator](b[superOperator](isRight)) : a[operator](b));
*/
//[50,[30,[20, 10]],70].superReduce('mean') = [50,[30,15],70] -> [50,22.5,70] -> 47.5
Array.prototype.superReduce = function(operator, isRight){
	return this.map(x=>x.isArray() ? x.superReduce(operator,isRight) : x)[operator+(isRight?'RTL':'')](); // 해당 함수에 이미 항등원 처리 반영
};

// comb // 빝 형태 추출
// Python의 Slicing과 유사, 다만 3번째 인수는 크기 | Python
// [1,4,2,8,5,7,3,6,9].comb(2) = [1,2,5,3,9]       | [::2]
// [1,4,2,8,5,7,3,6,9].comb(3) = [1,8,3]           | [::3]
// [1,4,2,8,5,7,3,6,9].comb(-2) = [9,3,5,2,1]      | [::-2]
// [1,4,2,8,5,7,3,6,9].comb(-3) = [9,7,2]          | [::-3]
// [1,4,2,8,5,7,3,6,9].comb(-3,7) = [6,5,4]        | [7::-3]
// [1,4,2,8,5,7,3,6,9].comb(2,2,2) = [2,5]         | [2:5:2] or [2:6:2]
// [1,4,2,8,5,7,3,6,9].comb(2,2,3) = [2,5,3]       | [2:7:2]
// [1,4,2,8,5,7,3,6,9].comb(2.5) = [1,8,7,9]       | 미지원
// [1,4,2,8,5,7,3,6,9].comb(4,0,5) = [1,5,9]          회전 제외
// [1,4,2,8,5,7,3,6,9].comb(4,0,5,true) = [1,5,9,8,6] 회전 허용

Array.prototype.comb = function(stride, start, size, isRotate){
	stride ??= 1;
	size ??= this.length;
	
	let ar = [];
	if(stride>=0){
		start ??= 0;
		
	}else if(stride<0){
		start ??= this.length-1;
		
	}else
		return Array.NaA;
	
	
	for(let i=0;i<size;i++){
		let I = Math.round(start + stride * i);
		if(!isRotate && (I < 0 || I > this.length-1)) break;
		ar.push(this.at(I % this.length));
	}
	
	return ar;
};

// near(연산, 간격, 크기)
// 인접한 두 또는 몇 칸끼리 계산, stride>0 : a op b, stride<0 : b op a, stride==0 : 자기자신실행
// [1,4,2,8].near('add') = [1+4,4+2,2+8] = [5,6,10]
// [1,4,2,8].near('sub') = [1-4,4-2,2-8] = [-3,2,-6]
// [1,4,2,8].near('sub',-1) = [4-1,2-4,8-2] = [3,-2,6]
// [1,4,2,8].near('sub',0) = [1-1,4-4,2-2,8-8] = [0,0,0,0]
// [1,4,2,8].near('sub',1,3) = [1-4-2,4-2-8] = [-5,-6]
// [1,4,2,8,5,7,3,6,9].near('sub',2,3) = [-6,-11,-6,-5,-7]
// [1,4,2,8,5,7,3,6,9].near('add',1,4) = [1+4+2+8,4+2+8+5,2+8+5+7,...] = [15,19,22,23,21,25]
// [1,4,2,8,5,7,3,6,9].near('mean',2,4)
//  = [[1,2,5,3].mean(),[4,8,7,6].mean(),[2,5,3,9].mean()] = [2.75,6.25,4.75]
// 2개씩 묶고자 할 때
// [1,4,2,8,5,7].near('pack2').toStringEx() = [[1,4],[4,2],[2,8],[8,5],[5,7]]
// 3개씩 묶고자 할 때
// [1,4,2,8,5,7].near('this',1,3).toStringEx() = [[1,4,2],[4,2,8],[2,8,5],[8,5,7]]
// wrap 대신 this 사용, 일반적인 것은 N개씩 리듀싱이 진행되는데 리듀싱을 하지 않은 채 현행 값 유지하므로
// 활용 : 파스칼 삼각형
// pascal = [1]
// pascal = [1].concat(pascal.near('add'), [1]) // 반복

// rotate 인자 설정 시 머리 부분은 처음부터 끝까지 진행하고 뒷 부분은 되돌아가서 진행
// [1,4,3,5,7].near('sub', 3, 2, true) = [1-5,4-7,3-1,5-4,7-3] = [-4,-3,2,1,4]

Array.prototype.near = function(operator, stride, size, isRotate){
	stride ??= 1;
	size ??= 2;
	isRotate ??= false;
	
	if(size == 2 && NNARY_OPERATORS[operator] == 2){
		let that = this;
		if(isRotate){
			if(stride >= 0)
				return this.map((a,i)=>a[operator](that.at((i+stride)%this.length)));
			else 
				return this.map((a,i)=>that.at((i-stride)%this.length)[operator](a));
		}else{
			if(stride >= 0)
				return this.slice(stride).map((a,i)=>that[i][operator](a));
			else
				return this.slice(-stride).map((a,i)=>a[operator](that[i]));
		}
	}else{
		if(isRotate){
			// 회전 적용시 항상 머리 기준이므로 무조건 n개 배열 반환
			if(stride >= 0)
				return this.map((a,i,A)=>A.comb(stride,i,size,true)[operator]());
			else{
				let operatorRTL = this[operator+'RTL'] !== undefined ? operator+'RTL' : operator;
				return this.map((a,i,A)=>A.comb(-stride,i,size,true)[operatorRTL]());
			}
		}else{
			let n = Math.round(this.length - Math.abs(stride)*(size-1));
			let ar = new Array(n);
			if(stride >= 0){
				for(let i=0;i<n;i++){
					ar[i] = this.comb(stride, i, size)[operator]();
				}
			}else{
				let operatorRTL = this[operator+'RTL'] !== undefined ? operator+'RTL' : operator;
				for(let i=0;i<n;i++){
					ar[i] = this.comb(-stride, i, size)[operatorRTL]();
				}
			}
			return ar;
		}
	}
};


// 누적연산
// [1,4,2,8].accum('add') = [1,5,7,15]
// [1,4,2,8].accum('sub') = [1,1-4,1-4-2,1-4-2-8] = [1,-3,-5,-13]
// [1,4,2,8].accum('sub',RTL) = [8-2-4-1,8-2-4,8-2,8] = [1,2,6,8]

Array.prototype.accum = function(operator, isRight){
	let cum = this[isRight ? this.length-1 : 0];
	if(isRight)
		return this.reverseCopy().map((a,i,A)=>(cum = i ? cum[operator](a) : cum)).reverse();
	return this.map((a,i,A)=>(cum = i ? cum[operator](a) : cum));
};

// 계산행렬표
/* [1,2,3,4].matrix('mul') = [
	[1,2,3,4],
	[2,4,6,8],
	[3,6,9,12],
	[4,8,12,16]
] 
*/

Array.prototype.matrix = function(operator, other){
	if(other !== undefined)
		return this.map((a,i,A)=>other.map((b,j)=>a[operator](b)));
	else
		return this.map((a,i,A)=>A.map((b,j)=>a[operator](b)));
};

for(let operator of BINARY_OPERATORS){
	Array.prototype[operator+'RTL'] = function(){ // [10, 5, 7].subReduce() = 10-5-7=-2, [10, 5, 7].subReduce(true) = 10-(5-7) = 12
		if(this.NaA || !this.length) return Number.identities[operator]; // 빈 배열은 항등원 반환
		return this.opReduce(operator, true);
	};
	let innerOperator = operator.addCamelPrefix('inner');
	Array.prototype[innerOperator] = function(depth){ // [[10,20],[30,5]].addInnerReduce() = [30,35]
		depth ??= 1;
		if(depth >= 2)
			return this.map(a=>a.isArray()?a[innerOperator](depth-1):a);
		if(depth >= 1)
			return this.map(a=>a.isArray()?a[operator]():a);
		return this[operator]();
	};
	let innerOperatorRTL = operator.addCamelPrefix('inner') + 'RTL';
	Array.prototype[innerOperatorRTL] = function(depth){ // [[10,20],[30,5]].addInnerReduce() = [30,35]
		depth ??= 1;
		if(depth >= 2)
			return this.map(a=>a.isArray()?a[innerOperatorRTL](depth-1):a);
		if(depth >= 1)
			return this.map(a=>a.isArray()?a[operator+'RTL']():a);
		return this[operator+'RTL']();
	};
}


// [덧셈-]곱셈-거듭제곱 함수

Array.prototype.mulPow = function(){
	return this.reduce((a,b)=>b.isArray()?a.mul(b.superReduce('pow')):a.mul(b));
	//return this.reduce((a,b)=>b.isArray()?(b.opTag=='div'?a.div(b.powSuperReduce()):a.mul(b.powSuperReduce())):a.mul(b));
};

Array.prototype.addMulPow = function(){
	return this.reduce((a,b)=>b.isArray()?a.add(b.mulPow()):a.add(b));
};


////////////////
// 배열연산자 //
////////////////

Array.prototype.sum = function(){ // sum은 addReduce와는 달리 NA를 무시함
	if(!this.isValidArray()) return Array.NaA;
	let dna = this.dropNA(); // NA제거
	if(!dna.length) return 0; // 합계의 특징상 하나라도 없으면 에러 대신에 0을 반환해야 함
	return dna.add();
};

Array.prototype.min = function(){
	if(!this.isValidArray()) return Array.NaA;
	return this.dropNA().least();
};

Array.prototype.max = function(){
	if(!this.isValidArray()) return Array.NaA;
	return this.dropNA().greatest();
};

// 고려사항
// [1,4,2,8] / 4
// [[1,4],[2,8],[NA,[7]],6] / [3,[4]]
Array.prototype.mean = function(){
	return this.sum().div(this.cardinality()).NaNtoNA();
};

// 멱평균 (1=산술, 0=기하, -1=조화)
Array.prototype.powerMean = function(p){ // Infinity, 0이 아닌 너무 크거나 작은 값 등은 계산오류가 발생함
	p ??= 0; // 기하평균
	if(p.isFinite())
		return p ? this.pow(p).sum().div(this.cardinality()).pow(1/p) : 
			this.log().sum().div(this.cardinality()).exp();
	return p > 0 ? this.abs().max() : this.abs().min(); // 무한대 값을 준 경우
}; // 하이퍼 파라미터 문제 있음

Array.prototype.var = function(){ // [100,50,70,[80,90,NA]].stdev()
	let dna = this.dropNA();
	let s = dna.mean();
	
	return dna.reduce((a,b)=>a.add(b.sqSub(s)),0).div(this.cardinality());
	//return (this.reduce((a,b)=>a+(b-s)*(b-s),0) / dna.length) ** 0.5;
};

Array.prototype.stdev = function(){ // [100,50,70,[80,90,NA]].stdev()
	let dna = this.dropNA();
	let s = dna.mean();
	
	return dna.reduce((a,b)=>a.add(b.sqSub(s)),0).div(this.cardinality()).sqrt();
	//return (this.reduce((a,b)=>a+(b-s)*(b-s),0) / dna.length) ** 0.5;
};

Array.prototype.prod = function(){
	if(!this.isValidArray()) return Array.NaA;
	let dna = this.dropNA(); // NA제거
	if(!dna.length) return 0; // 합계의 특징상 하나라도 없으면 에러 대신에 0을 반환해야 함
	return dna.mul();
};


// 리습 연산자

Array.prototype.car = function(){ return this[0]; };
Array.prototype.cdr = function(){ return this.slice(1); };
Array.prototype.cddr = function(){ return this.slice(2); };
Array.prototype.cdddr = function(){ return this.slice(3); };
Array.prototype.cadr = function(){ return this[1]; };
Array.prototype.caddr = function(){ return this[2]; };
Array.prototype.cadddr = function(){ return this[3]; };

Array.prototype._lisp = function(stackTrace){ // ['add', 1, ['minus', 3], ['mul', 7, ['sub', 6, 3]]] :: 1+(-3)+(7*(6-3))
	let fname = this.car();
	let array = this.cdr();
	
	try{
		if(stackTrace){
			stackTrace.length = this.length;
			stackTrace.fill('-');
			stackTrace[0]='😊'+fname;
		}
	
		if(!fname.isString()) return NA; // 함수 이름이 아님
		// list와 array의 차이점
		// list는 안에 연산을 하지 않고 array는 연산을 한다.
		if(fname == 'list') return array; // 목록 생성인 경우는 배열을 생성하고 그 안에는 연산을 하지 않음
		array = array.map((x,i)=>x.typeof == 'array' ? x._lisp(stackTrace?(stackTrace[i]=[]):null) : x);
		if(fname == 'exec') return array.car()._lisp(); // 해당 배열을 실행하기 (NA검증완료)
		
		// 속성제어
		if(fname.getCamelPrefix() == 'get'){ // 반환
			if(fname == 'get') return nullToNA(array.cadr()[array.car()]); // ['get', 'length', ['list', 3, 5, 9]].lisp() = 3
			return nullToNA(array.car()[fname.removeCamelPrefix()]); // ['getLength', ['list', 3, 5, 9]].lisp() = 3
		}
		if(fname.getCamelPrefix() == 'set'){ // 설정과 동시에 반환
			if(fname == 'set') return nullToNA(array.cadr()[array.car()] = array.caddr()); // ['set', 'href', location, '~~~'].lisp()
			return nullToNA(array.car()[fname.removeCamelPrefix()] = array.cadr()); // ['setHref', 'location', '~~~'].lisp()
		}
		if(fname.getCamelPrefix() == 'del'){ // 속성 삭제
			if(fname == 'del') delete array.cadr()[array.car()];
			delete array.car()[fname.removeCamelPrefix()];
			return NA;
		}
		
		if(fname == 'array') return array;
		
		
		switch(NNARY_OPERATORS[fname]){
			//case 1: return array.car()[fname](); // 연산자들
			case 2: return nullToNA(array[fname+'Reduce']()); // 이항의 경우만 리듀싱 하고 그외는 함수 호출을 함
			default: return nullToNA(array.car()[fname](...array.cdr())); // Ex: inRange --> ['inRange', 10, 3, 12] --> true
			// 일반적인 함수실행
			// ['mean', ['list', 3, 5, 8]] 등등
		}
	}catch(e){
		if(stackTrace) stackTrace[0]='💣'+fname;
		return e;
	} // 에러는 반환 형태로...
};

Array.prototype.lisp = function(stackTrace){
	if(stackTrace){
		stackTrace.length = 0;
	}
	
	return this._lisp(stackTrace);
};

// 추후 asmdp 예정

// 배열 전체 비교 (길이도 체크함)


Array.prototype.naValueObject = function(v){return this;}; // 객체 자체 NA값 처리이므로, 배열 각 내부는 naValue 사용

Array.prototype.similarObject = function(other){ // 배열이 같은지 비교, '0' 과 0 정도만 허용하고 모양이 다르면 바로 false 처리함
	return this == other || other.isArray() && this.length == other.length && this.every((a,i)=>a.similarObject(other[i]));
};

Array.prototype.notSimilarObject = function(other){
	return !this.similarObject(other);
};

Array.prototype.equalObject = function(other){ // 배열이 같은지 비교, '0' 과 0 정도만 허용하고 모양이 다르면 바로 false 처리함
	return other.isArray() && this.length == other.length && this.every((a,i)=>a.equalObject(other[i]));
};

Array.prototype.notEqualObject = function(other){
	return !this.equalObject(other);
};

Array.prototype.identicalObject = function(other){
	return other.isArray() && this.length == other.length && this.every((a,i)=>a.identicalObject(other[i]));
};

Array.prototype.notIdenticalObject = function(other){
	return !this.identicalObject(other);
};

Array.prototype._EachObject = function(what, other){
	what += 'Object';
	if(this.NaA) return Array.NaA;
	if(other.isArray()){
		if(this.length != other.length && this.length != 1 && other.length != 1) return Array.NaA;
		return this.map((x,i)=>x[what](other[i]));
	}
	return this.map((x,i)=>x[what](other));
};

for(let op of ['equal', 'identical', 'notEqual', 'notIdentical']){
	Array.prototype[op+'EachObject'] = function(other){
		return this._EachObject(op, other);
	};
}


// 깊이 내부 연산자, 모든 배열 연산자에 해당됨

for(let aop of ARRAY_UNARY_OPERATORS){ // 단항 배열 연산자
	let innerAop = aop.addCamelPrefix('inner');
	Array.prototype[innerAop] = function(depth){
		depth ??= 1;
		if(depth >= 2)
			return this.map((x,i)=>(x.isArray()?x:[x])[innerAop](depth-1));
		if(depth >= 1){
			return this.map((x,i)=>x[aop]()); // Broadcasting
		}
		return this[aop]();
	};
}

for(let aop of ARRAY_BINARY_OPERATORS){ // 이항 배열 연산자
	let innerAop = aop.addCamelPrefix('inner');
	Array.prototype[innerAop] = function(depth, other){
		if(other === undefined){ other = depth; depth = 1;}
		if(depth >= 2)
			return this.map((x,i)=>(x.isArray()?x:[x])[innerAop](depth-1, other));
		if(depth >= 1){
			if(other.isArray()){
				if(other.length == 1) // Broadcasting
					return this.map((x,i)=>x[aop](other[0]));
				return this.map((x,i)=>x[aop](other[i]));
			}
			return this.map((x,i)=>x[aop](other)); // Broadcasting
		}
		return this[aop](other);
	};
	
	
	// 통계 연산에 한해서 Super 를 제공함
	
}

for(let aop of ARRAY_TERNARY_OPERATORS){ // 삼항 이상 배열 연산자, 단항처럼 취급함
	let innerAop = aop.addCamelPrefix('inner');
	Array.prototype[innerAop] = function(depth, ...args){
		depth ??= 1;
		if(depth >= 2)
			return this.map((x,i)=>(x.isArray()?x:[x])[innerAop](depth-1, ...args));
		if(depth >= 1){
			return this.map((x,i)=>x[aop](...args)); // Broadcasting
		}
		return this[aop](...args);
	};
}

/*
Array.prototype.mode = function(){ // 최빈값
	
};

Array.prototype.equalArrayVictims = function(){ // [3,3,3,4,5].equalArrayVictims() = [4,5] (최빈값에 준하여 처리)
};

*/

// 기타 연산

Array.prototype.getAttrEach = 
Array.prototype.attrEach = function(x){
	return this.map(a=>a[x]);
};

Array.prototype.setAttrEach = function(x, val){
	this.forEach(a=>a[x]=val);
	return this;
};

Array.prototype.funcall = function(x, ...args){ // map과 다른 점은 각 객체의 내부 메소드를 실행한다.
	return this.map(a=>a.isArray() ? a.funcall(x, ...args) : a[x](...args));
};

/* 권장하지 않음
Array.prototype.expr = function(vx, vy, expr, other){ // x, y로 이루어진 식 사용, From식 굳이 필요 없음
	if(expr === undefined) expr = vx, other = vy, vx = 'x', vy = 'y';
	let f = new Function(vx, vy, 'return '+expr+';');
	if(other instanceof Array) return this.map((a,i)=>f(a, other[i]));
	return this.map(a=>f(a, other));
};
*/


// 배열 요소 내 일치성 및 유일성 (==과 ===의 차이는 타입일치 체킹여부)

Array.prototype.areAllEqualElement = function(){ // 전(全)요소 일치
	return this.every((a,i,A)=>a.equalObject(A[0]));
};

Array.prototype.areAllIdenticalElement = function(){ // 전(全)요소 및 타입 일치
	return this.every((a,i,A)=>a.identicalObject(A[0]));
};

Array.prototype.areAllUniqueElement = function(){ // !Array.prototype.isAllEqual() 과 같은 것이 아님! 모두 다른지 물어보는 것임
	return this.every((a,i,A)=>A.every((b,j,A)=>i==j || A[i].notEqualObject(b))); // A[j] == b
};

Array.prototype.areAllIdentityUniqueElement = function(){ // !Array.prototype.isAllIdentical() 과 같은 것이 아님! 모두 다른지 물어보는 것임
	return this.every((a,i,A)=>A.every((b,j,A)=>i==j || A[i].notIdenticalObject(b))); // A[j] == b
};

// 차원 확인

Array.prototype.isLinearArray = function(){
	return !this.NaA && this.every(a=>!(a instanceof Array));
};

Array.prototype.isValidMatrix = function(){
	return !this.NaA && this[0].length !== undefined && this.attrEach('length').areAllEqualElement();
};

// 형태 조정

Array.prototype.superFlat = function(){ // 완전히 평탄화 시킴
	if(this.every(x=>!x.isArray())) return this;
	return this.flat().superFlat();
};

// 현재 flatted 배열 및 shape = [0, 6, [2, 3, [4, 5]], 1, []] 이렇게 인덱스 지정 필수
// [10, 30, 'a', 'b', false, NA, -3.8].reshape([0, 6, [2, 3, [5, 4]], 1, []])
// [10,-3.8,['a','b',[N/A,false]],30,[]]
Array.prototype.reshape = function(shape){
	// 두 배열 모두 배열이 아니거나 유효한 배열이 아닌 경우 NaA 반환
	// 단, 현재 배열은 유효성은 모르나 일단 배열임
	if(!this.isValidArray() || !shape.isArray() || !shape.isValidArray()) return Array.NaA;
	let that = this;
	return shape.map(x=>x.isArray()?that.reshape(x):nullToNA(that[x]));
};


// 행렬의 곱셈

Array.prototype.matMul = function(other){
	if(!this.isValidMatrix()) return Array.NaA;
	if(!other.isValidMatrix()) return Array.NaA;
	if(this[0].length != other.length) return Array.NaA;
	let nk = this[0].length;
	let array = Array.makeDimArrayFilled(0, this.length, other[0].length);
	let that = this;
	
	array = array.mapDim((cell,i,j)=>nk.forSum(k=>that[i][k].mul(other[k][j])));
	//array = array.map((row,i)=>row.map((cell,j)=>nk.forSum(k=>that[i][k].mul(other[k][j]))));
	return array;
};

Array.prototype.matMulFrom = function(other){
	return other.matMul(this);
};

// 연산자 형태로 사용하기
// A+B 로는 불가하나, A["+"](B) 로는 가능
// C++, Python에서는 제공 중인 연산자 오버로딩 같은 것이 현재 지원되지 않음


// 표기 고안중







// 레이블 붙이기

Array.prototype.setRowLabel = function(rows){
	this.rows = rows;
};

Array.prototype.setColLabel = function(cols){
	this.cols = cols;
};

Array.prototype.setCornerLabel = function(label){
	this.corner = label;
};

Array.prototype.setLabels = function(rows, cols, corner){
	if(rows !== undefined) this.rows = rows;
	if(cols !== undefined) this.cols = cols;
	if(corner !== undefined) this.corner = corner;
	return this;
};

/*
Array.prototype.setLabelAsIndex = function(){
	this.cols = Array.numbers();
};
*/


// 대괄호 포함된 toString 함수, 중첩 포함됨
Array.prototype.toStringEx = function(){
	if(this.NaA) return 'NaA';
	return '['+this.map(x=>x.toStringEx())+']';
};

// 테이블로 보기 편하게 HTML 코드 생성하는 함수

Array.prototype.toHTMLTable = function(table, tr, td, th){
	if(this.NaA) return Array.showOnNaA ?? 'NaA<br>';
	table ??= Array.tableTag;
	tr ??= Array.trTag;
	td ??= Array.tdTag;
	th ??= Array.thTag;
	table ??= '<table>';
	tr ??= '<tr>';
	td ??= '<td>';
	th ??= '<th>';
	let tableEnd = table[0]+'/'+table.substr(1);
	let trEnd = tr[0]+'/'+tr.substr(1);
	let tdEnd = td[0]+'/'+td.substr(1);
	let thEnd = th[0]+'/'+th.substr(1);
	if(this.isLinearArray())
		return table+tr+this.map((x,i)=>th+i+thEnd).join('')+trEnd+tr+this.map((x,i)=>td+x+tdEnd).join('')+trEnd+tableEnd;
	return table+(this.cols?tr+th+(this.corner??'')+thEnd+this.cols.map(x=>th+x+thEnd).join('')+trEnd:'')+this.map((x,i)=>tr+(this.rows?th+this.rows[i]+thEnd:'')+(x instanceof Array?x.map(y=>td+y+tdEnd).join(''):td+x+tdEnd)+trEnd).join('')+tableEnd;
};




String.prototype.search = function(what){
	let that = this;
	if(typeof what == 'string')
		return this.indexOf(what) != -1;
	else if(what instanceof Array)
		return what.some(a=>that.indexOf(a) != -1);
	else
		return this.indexOf(what.toString()) != -1;
};

String.prototype.searchAsIndex = function(what){
	let that = this;
	if(typeof what == 'string')
		return this.indexOf(what);
	else if(what instanceof Array)
		return what.findIndex(a=>that.indexOf(a) != -1);
	else
		return this.indexOf(what.toString());
};





String.prototype.replace_by_obj = function(obj){
	var s = this;
	for(var k in obj){
		s = s.replaceAll('{{'+k+'}}', obj[k]);
	}
	return s;
};


// /"([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\'/g 따옴표와 쌍따옴표

String.prototype.assign = function(obj){
	try{
	return this.replace(/\{\{[^\}]+\}\}/g, function(match){
		if(match == '{{(}}') return '{';
		if(match == '{{)}}') return '}';
		match = match.slice(2, -2);
		
		// 따옴표는 Function 파싱 시에 처리하므로 별다른 조치는 안해도 됨
		// 동원된 식별자들 리스트에 포함시키기
		var idf_names = [];
		var idf_values = [];
		for(var idf in obj){
			idf_names.push(idf);
			idf_values.push(obj[idf]);
		}
		
		// 그외 식별자 처리
		//match = match.replace(/[A-Za-z_][0-9A-Za-z_]*/g, function(idf){
		//	return obj[idf];
		//});
		
		
		return Function(...idf_names,'return '+match+';')(...idf_values);
	});
	}catch(e){return '#'+e.name+'#';}
};

// 문자열 채우기
String.prototype.empty_fill = function(c, n){
	let dir, cnt;
	c+='';
	// 파이썬에 따름
	// 기본 오른 정렬로 한다
	if(typeof(n) == 'string' && (n[0] == '<' || n[0] == '>' || n[0] == '^')) dir = n[0], cnt = +n.substr(1);
	else if(+n >= 0) dir = '>', cnt = +n;
	else if(+n < 0) dir = '<', cnt = -n;
	else throw ValueError("empty_fill: second parameter violation!!!! /^['+''-''^''<''>']?\\d+$/");
	
	// 확보된 크기와 딱 맞거나 초과될 시 현 문자열 그대로 반환
	if(this.length >= cnt) return this;
	
	// 아니면 채움 문자
	switch(dir){
		case '>': return c.repeat(cnt-this.length) + this;
		case '<': return this + c.repeat(cnt-this.length);
		case '^': 
		let half = Math.floor((cnt-this.length) / 2);
		return c.repeat(half) + this + c.repeat(cnt-this.length-half);
	}
};


// 숫자 영 채우기, 다른 문자는 문자열 변환 후 사용
Number.prototype.zero_fill = function(n){
	switch(Math.sign(this)){
		case  1: return this.toString().empty_fill(0, n);
		case  0: return '0'.repeat(n);
		case -1: return '-'+(-this).toString().empty_fill(0, Math.max(0,n-1));
		default: return this.toString();
	}
};

// 형변환 (parseInt, parseFloat)
// 배열의 각 엘리멘트 형변환은 .toInt(), .toFloat() 등 이용
Boolean.prototype.parseInt = function(){ return +this;};
Number.prototype.parseInt = 
String.prototype.parseInt = function(){ return parseInt(this); };
Array.prototype.parseInt = function(){ return NA; };

Boolean.prototype.parseFloat = function(){ return +this;};
Number.prototype.parseFloat = 
String.prototype.parseFloat = function(){ return parseFloat(this); };
Array.prototype.parseFloat = function(){ return NA; };

// NaN은 == 연산자에서 잘못된 결과가 나오므로 NA로 변환하기를 권고함, 배열은 각 요소에서 처리함
Boolean.prototype.NaNtoNA = 
String.prototype.NaNtoNA = function(){ return this.valueOf();};
Number.prototype.NaNtoNA = function(){ return isNaN(this)?NA:this.valueOf();};

// CLEAR! '{{a}} + {{b}} = {{a+b}}'.assign({a:10, b:20})

// CLEAR! '{{aa}} * {{a}} + 10 / {{a2}} = {{aa*a + 10 / a2}}'.assign({a:10, aa:20, a2:2})

// CLEAR! '{{a}} {{(}}{{(}}a{{)}}{{)}}'.assign({a:10})

// "{{a+'\\'a\\''}}".assign({a:"'x'"})

// "{{'{'+'}'}}".assign()

// 관계배열을 객체로... Pandas JS버전(?)
Array.prototype.relatedArrayToObjects = function(key, add_attrs){
	let bob = {};
	if(key === undefined || key === null) key = '#';
	
	for(let i=1;i<this.length;i++){
		let ob = {};
		for(let j=0;j<this[0].length;j++){
			ob[this[0][j]] = this[i][j];
		}
		bob[ob[key]] = ob;
	}
	
	if(add_attrs !== undefined && add_attrs !== null){
		for(let k in add_attrs){
			bob[k] = add_attrs[k];
		}
	}
	
	return bob;
};

Array.prototype.normalize = function(m2, s2){ // 표준화
	let [m1, s1] = [this.mean(), this.stdev()];
	return this.map(a=>a.normal(m1, s1, m2, s2));
};

Array.prototype.rate = function(k){ // 점유율, 득표율 등 계산
	let sum = this.sum();
	return this.map(a=>a.div(sum).mul(k ?? 1));
};

Array.prototype.fitMinMax = function(minTo, maxTo){ // 최대-최소 스케일링
	let maxFrom = this.max();
	let minFrom = this.min();
	if(minTo === undefined){
		minTo = 0;
		maxTo = 1;
	}
	else if(maxTo === undefined){
		maxTo = minTo;
		minTo = 0;
	}
	return this.map(a=>(a - minFrom) / (maxFrom - minFrom) * (maxTo - minTo) + minTo);
};


/*
// 체인 방식으로 객체를 추가(편집)/삭제함
Object.prototype.addAttribute = function(a, v){this[a] = v; return this;};
Object.prototype.removeAttribute = function(a){delete this[a]; return this;};
Object.prototype.addAttributes = function(dict){for(var key in dict) this[key] = dict[key]; return this;};

// 별칭
Object.prototype.adda = 
	Object.prototype.setAttribute = 
	Object.prototype.addAttribute;

Object.prototype.rema = 
	Object.prototype.removeAttribute;
*/
