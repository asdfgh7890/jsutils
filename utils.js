
// 오픈소스입니다! MIT 라이선스 적용

const JSUTILS_VERSION = 20220727.0; // JS유틸 버전 코드

const identical = x => x; // 항등함수

// 불필요한 상수 삭제

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

// 전체 타입 체킹 기본값 정의
Object.defineProperty(Object.prototype, 'isNumber'      , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isBigInt'      , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isNumeric'     , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isString'      , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isBoolean'     , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isArray'       , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isGeneralArray', {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isTypedArray'  , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isSequence'    , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isSet'         , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isMap'         , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'isNA'          , {enumerable:false, writable:true, value:function(){return false;}});
Object.defineProperty(Object.prototype, 'toStringEx'    , {enumerable:false, writable:true, value:function(){try{return this.toString();}catch(e){return e.toString();}}});
Object.defineProperty(Object.prototype, 'naValue'       , {enumerable:false, writable:true, value:function(v){return this;}});
Object.defineProperty(Object.prototype, 'naValueObject' , {enumerable:false, writable:true, value:function(v){return this;}});
Object.defineProperty(Object.prototype, 'count'         , {enumerable:false, writable:true, value:function(){return 1;}});
Object.defineProperty(Object.prototype, 'validCount'    , {enumerable:false, writable:true, value:function(){return 1;}});
Object.defineProperty(Object.prototype, 'toInt'         , {enumerable:false, writable:true, value:function(){return Number(this).trunc();}});
Object.defineProperty(Object.prototype, 'toFloat'       , {enumerable:false, writable:true, value:function(){return Number(this);}});
Object.defineProperty(Object.prototype, 'toNumber'      , {enumerable:false, writable:true, value:function(){return Number(this);}});
Object.defineProperty(Object.prototype, 'toBoolean'     , {enumerable:false, writable:true, value:function(){return Boolean(this);}});
Object.defineProperty(Object.prototype, 'toArray'       , {enumerable:false, writable:true, value:function(){return [this];}});

Number.prototype.isNumber = function(){return true;};
BigInt.prototype.isBigInt = function(){return true;};
Number.prototype.isNumeric = 
BigInt.prototype.isNumeric = function(){return true;};
String.prototype.isString = function(){return true;};
Boolean.prototype.isBoolean = function(){return true;};
Array.prototype.isArray = function(){return true;};
Array.prototype.isGeneralArray = function(){return true;};
Set.prototype.isSet = function(){return true;};
Map.prototype.isMap = function(){return true;};

BigInt.safeConvert = function(n){try{return BigInt(Math.trunc(n));}catch(e){return 0n;}};
BigInt.hybridConvert = function(n){try{return BigInt(n);}catch(e){try{return Number(n);}catch(e){return NaN;}}};

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


// Global Fusion
/*
각종 유틸리티를 제공
Array, Number 등은 Gfunc 없이도 가능
Array.<Gfunc> 를 실행하여도 내부적으론 전역 Gfunc 이용
*/

const Gfunc = {};




// 계산 중간 과정 디버깅 메소드

// [통합 호출 메소드]
// 메소드 호출 뿐만 아니라 속성값을 사용하고자 할 때
// 1. 람다식 또는 전역함수의 경우는 내부적으로 감싸서 호출됨 (ex: o.call(x=>x+5) => (x=>x+5)(o))
// 2. 일반 메소드명은 문자열로 표기 (ex: o.call('getHours'), o.call('setHours', 10))
// 3. 속성을 구할 때는 앞에 @를 붙여서 표기 (ex: o.call('@length'))
// 4. 속성을 설정하고자 할 때는 뒤에 인자를 추가 (ex: o.call('@abcd', 1234))
// 5. ScaledArray에서 실제 환산된 값을 처리하기 위해서 앞에 #을 붙여서 표기 (ex. o.call('#2'))
// Gfunc 사용 시에는 반드시 대상 객체를 설정함
Gfunc.call = 
function(object, what, ...args){
	if(typeof what == 'function') return what(object, ...args);
	if(what.startsWith('@')){
		if(args.length)
			return object[what.slice(1)] = args[0];
		return object[what.slice(1)];
	}
	return object[what](...args);
};


Gfunc.trace = 
function(object){ // 계산 중 현재 값 확인, 스택 위치 조회 가능
	console.trace(object);
	return object;
};

Gfunc.debug = 
function(object){ // 계산 중 현재 값 확인, 콘솔에 현재 값만 출력함
	console.log(object);
	return object;
};

// 선택 실행 메소드
Gfunc.optional = 
function(run_or_survive, what, ...args){
	return run_or_survive ? this[what](...args) : (this === NA ? this : this.valueOf());
};


// 보호 메소드 (오류를 분석하고 실행을 계속할 필요가 있을 때)
Gfunc.safeCall = 
function(object,what, ...args){
	try{
		return Gfunc.call(object,what,...args);
	}catch(e){return e;}
};



Function.prototype.safeCall = function(...args){ // 함수 수준에서도 세이프콜 제공
	try{
		return this.call(...args);
	}catch(e){
		return e;
	};
};

Function.prototype.safeApply = function(...args){ // 함수 수준에서도 세이프콜 제공
	try{
		return this.apply(...args);
	}catch(e){
		return e;
	};
};

Function.prototype.applyDB = function(object, database){ // 데이터베이스식 호출
	let fn = this;
	return database.map(row=>fn.apply(object, row));
};

//Math.hypot.applyDB(null, [[3,4],[1,2,2],[5,12]]) = [5,3,13]



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

// 중간에 '$' 을 쓸 시 원래 객체부터 다시 시작 (특히 setter 이후)

// safeCombined는 Error 발생 시 그 Error 객체를 반환값으로 처리함

Gfunc.combined = 
function(object,...operators){
	let curr = object;
	
	for(operator of operators){
		if(typeof operator == 'function'){
			curr = operator(curr);
		}else if(operator.isGeneralArray()){
			let [[fname], args] = operator.knife(1);
			
			if(typeof fname == 'function'){
				curr = fname(curr, ...args);
			}else{
				if(fname.endsWith(':'))
					fname = fname.slice(0,-1);
				
				curr = Gfunc.call(curr, fname, ...args);
				
				/*
				if(fname.startsWith('@')){
					fname = fname.slice(1);
					if(args[0] !== undefined)
						curr[fname] = args[0];
					else
						curr = curr[fname];
				}else
					curr = curr[fname](...args);
				*/
			}
		}else if(operator == '$'){
			curr = object;
		}else{
			curr = Gfunc.call(curr, operator);
		}
	}
	return curr;
};

Gfunc.safeCombined = 
function(object,...operators){
	let curr = object;
	
	for(operator of operators){
		if(typeof operator == 'function'){
			curr = operator(curr);
		}else if(operator.isGeneralArray()){
			let [[fname], args] = operator.knife(1);
			
			if(typeof fname == 'function'){
				curr = fname(curr, ...args);
			}else{
				if(fname.endsWith(':'))
					fname = fname.slice(0,-1);
				
				curr = Gfunc.safeCall(curr, fname, ...args);
				
				/*
				if(fname.startsWith('@')){
					fname = fname.slice(1);
					if(args[0] !== undefined)
						curr[fname] = args[0];
					else
						curr = curr[fname];
				}else
					curr = curr[fname](...args);
				*/
			}
		}else if(operator == '$'){
			curr = object;
		}else{
			curr = Gfunc.safeCall(curr, operator);
		}
	}
	return curr;
};



// [퓨전 메소드]

// 혼합 연산, 평균과 표준편차 등등 동시에 구할 때 유용
// [1,4,2,8].fusion(['sum','mean','stdev','N']) = 

// 매개변수가 필요한 경우 [1,4,2,8].fusion([['powerMean:', -1], ['powerMean:', 0]])

// 매개변수인지 중첩 퓨전인지 구별을 위해서 함수명 뒤에 ':' 을 붙여서 구별함
// [1,4,2,8].fusion([['sadd', 'sadd'], ['sadd:', 'sadd']]).toStringEx();
// = [['1428','1428'],['1sadd','4sadd','2sadd','8sadd']]

// 일반 숫자 등에 대해서도 퓨전 연산 가능
// 10..fusion(['minus', 'reciproc',['combined:',['add',5],['mul',2]]]).toStringEx() = [-10, 0.1, 30]

// 전역 함수에 매개변수가 있을 시에는 'fn:' 을 사용
// '10ef'.fusion([parseInt, ['fn:', parseInt, 16]])

Gfunc.fusion = 
function(object, operators, isSafe){
	let callfn = Gfunc.call;
	if(isSafe) callfn = Gfunc.safeCall;
	
	if(typeof operators !== 'function' && operators.isGeneralArray()){
		let [[car], cdr] = operators.knife(1);
		
		if(typeof car !== 'function' && car.isString() && car.endsWith(':')){ // 중첩 목적이 아닌 매개변수를 목적으로 한 경우 뒤에 콜론을 붙임 
			if(car == 'fn:'){
				return callfn(object, cdr[0], ...cdr.slice(1));
			}
			return callfn(object, car.slice(0,-1), ...cdr);
			/*
			if(car.startsWith('@')){ // Attribute
				if(cdr.length)
					return object[car.slice(1,-1)] = cdr[0]; // Set
				else
					return object[car.slice(1,-1)]; // Get
			} // Method
			return object[car.slice(0,-1)](...cdr);
			*/
		} // 아니면 중첩
		return operators.map(x=>Gfunc.fusion(object,x,isSafe));
	}
	
	// 단일 실행
	return callfn(object, operators);
};


Gfunc.this = 
function(object){return object;};



/*

=== 이터러블 메소드 ===

모두 Symbol.iterator 규정에 따름

$reduce, $every, $some, $filter, $map
 => $[fn] <=> Array.prototype.[fn] 와 동일하나 안에 함수가 없으면 항등함수 적용하고,
    Falsy한 값을 false동작, Truthy한 값을 true동작을 취함

$drop        => $filter와 반대로 동작함
$truthyCount => 참인 것의 개수를 반환
$truthyRate  => 전체 개수 대비 참인 것의 개수에 대한 비율 (모두 참이면 1, 거짓이면 0, 0과 1사이 값)
$truthyInfo  => 진위값에 대한 간단한 정보 반환, .true, .false 로 가능함
$binCount    => 각자 요소의 항목에 대하여 출현된 개수를 Map 형태로 반환
$binRate     => 각자 요소의 항목에 대하여 출현된 개수에 대한 비율을 Map 형태로 반환, .percent() 를 통해서 백분율로 변환 가능함.

*/

Gfunc.$reduce = function(iterable, fn, init){
	let it = this[Symbol.iterator]();
	let info, av;
	
	if(init === undefined){
		info = it.next();
		if(info.done) return NA;
		av = info.value;
		for(info=it.next();!info.done;info=it.next()){
			av = fn(av, info.value);
		}
	}else{
		av = init;
		for(info=it.next();!info.done;info=it.next()){
			av = fn(av, info.value);
		}
	}
	return av;
};
Gfunc.$every = function(iterable, fn){
	fn ??= identical;
	for(let e of iterable){
		if(!fn(e))
			return false;
	};
	return true;
};
Gfunc.$some = function(iterable, fn){
	fn ??= identical;
	for(let e of iterable){
		if(fn(e))
			return true;
	};
	return false;
};
Gfunc.$filter = function(iterable, fn){
	fn ??= identical;
	let array = [];
	for(let e of iterable){
		if(fn(e))
			array.push(e);
	};
	return array;
};
Gfunc.$drop = function(iterable, fn){
	fn ??= identical;
	let array = [];
	for(let e of iterable){
		if(!fn(e))
			array.push(e);
	};
	return array;
};
Gfunc.$map = function(iterable, fn){
	fn ??= identical;
	let array = [];
	for(let e of iterable){
		array.push(fn(e));
	};
	return array;
};
Gfunc.$truthyCount = function(iterable, fn){
	fn ??= identical;
	let tcount = 0;
	for(let e of iterable){
		if(fn(e))
			tcount++;
	};
	return tcount;
};
Gfunc.$truthyRate = function(iterable, fn){
	fn ??= identical;
	let tcount = 0, count = 0;
	for(let e of iterable){
		if(fn(e))
			tcount++;
		count++;
	};
	return tcount / count;
};
Gfunc.$truthyInfo = function(iterable, fn){
	fn ??= identical;
	let tcount = 0, fcount = 0;
	for(let e of iterable){
		if(fn(e))
			tcount++;
		else
			fcount++;
	};
	return {false:fcount, true:tcount, [0]:fcount, [1]:tcount, length:2, total:fcount+tcount, rate:tcount/(tcount+fcount), valueOf(){return [fcount,tcount];}, toString(){return fcount+','+tcount;}};
};
Gfunc.$binCount = function(iterable){
	let bin = new Map();
	for(let e of iterable){
		if(bin.get(e))
			bin.set(e, bin.get(e) + 1);
		else
			bin.set(e, 1);
	}
	return bin;
};
Gfunc.$binRate = function(iterable){
	let bin = new Map();
	let total = 0;
	for(let e of iterable){
		bin.set(e, (bin.get(e) ?? 0) + 1);
		total ++;
	}
	for(let e of bin.keys()){
		bin.set(e, bin.get(e) / total);
	}
	return bin;
};
Gfunc.$mapMap = function(iterable, fn){
	fn ??= identical;
	let map = new Map();
	for(let e of iterable){
		map.set(e, fn(e));
	}
	return map;
};
Gfunc.$mapSet = function(iterable, fn){
	fn ??= identical;
	let set = new Set();
	for(let e of iterable){
		set.add(fn(e));
	}
	return set;
};
Gfunc.$enumerate = function*(iterable){
	let idx = 0;
	for(let e of iterable){
		yield [idx++, e];
	}
};
Gfunc.$toArray = function(iterable, type, ...args){
	if(type !== undefined) return type.from(iterable, ...args);
	return Array.from(iterable);
};
Gfunc.$toSet = function(iterable){
	return new Set(iterable);
};
Gfunc.$toMap = function(iterable){
	return new Map(iterable);
};
Gfunc.$toEnumerateMap = function(iterable){
	return new Map(iterable.$enumerate());
};




/*
Gfunc.binary = function(A,B){ // 배열 대 배열
	
};
*/

// 에러 목록

class ETW extends Error{
	constructor(m){
		super(m);
		try{
			this.name = 'Warning';
		}catch(e){this.name = 0;}
	}
};

class SizeMismatchError extends Error{
	constructor(m){
		super(m);
		this.name = 'SizeMismatchError';
	}
};

class KeyMismatchError extends Error{
	constructor(m){
		super(m);
		this.name = 'KeyMismatchError';
	}
};



class ArrayBoundaryError extends Error{
	constructor(m){
		super(m);
		this.name = 'ArrayBoundaryError';
	}
};

class TypeWarning extends Error{
	constructor(m){
		super(m);
		try{
			this.name = 'TypeWarning';
		}catch(e){this.name = 0;}
	}
};




// 이 함수는 경고로 수준을 완화한다.
Gfunc.etw = 
function(object,what, ...args){
	try{
		return object[what](...args);
	}catch(e){console.warn(new ETW(e)); return e;}
};

// 검증 함수, falsy value일 때 throw, 보호나 경고 함수와 같이 쓸 수 있다
Gfunc.verify = 
function(object,message){
	if(!object.booleanObject()) throw new Error(message);
	return object;
};

// 체크 함수, 검증 함수와 달리 Warning을 적용함
Gfunc.check = 
function(object,message){
	if(!object.booleanObject()) console.warn(new Error(message));
	return object;
};


// 전체 오브젝트에 각종 연산자 모두 추가함, null, undefined는 불가능함 
// 그리고 for in 에 안걸리도록 조치

for(let op in Gfunc){
	Object.defineProperty(Object.prototype, op, {enumerable:false, writable:true, value:function(...args){
		return Gfunc[op](this, ...args);
	}});
};

//Object.defineProperty(Number.prototype, 'isNumber'      , {enumerable:false, value:function(){return true;}});


// 결측치 대체 함수, nc 함수 폐기

Number.prototype.naValue = function(v){return v.isGeneralArray() ? [this].naValue(v) : this.valueOf();};

String.prototype.naValueObject = 
Boolean.prototype.naValueObject = 
Array.prototype.naValueObject = 
Number.prototype.naValueObject = function(v){return this.valueOf();};


// 기본 연산자 기호화
// 배열 연산을 위해서...

// + 연산자의 혼란을 막기 위해 .add, .concat 별도 추가!


Number.prototype.normal = function(m1, s1, m2, s2){return (this-m1)/s1*(s2??1)+(m2??0);}; // deprecation


// 항의 개수는 .length 로 하면 찾아낼 수 있어서 굳이 unary 구별이 필요 없음

Object.arithmetic = { // 산술 연산 전용, 해당 함수는 Nubmer형으로 변환된다
	plus       : a=>+a,
	minus      : a=>-a,
	reciproc   : a=>1/a,
	bitwiseNot : a=>~a,
	abs        : a=>a < 0 ? -a : a,
	sign       : a=>Math.sign (a),
	exp        : a=>Math.exp  (a),
	expm1      : a=>Math.expm1(a),
	log        : a=>Math.log  (a),
	log10      : a=>Math.log10(a),
	log1p      : a=>Math.log1p(a),
	pow10      : a=>10   **    a ,
	percent    : a=>a*100, // % 값으로 표현
	unpercent  : a=>a/100, // % 값을 일반형 비율로
	permil     : a=>a*1000, // ‰ 값으로 표현
	unpermil   : a=>a/1000, // ‰ 값을 일반형 비율로
	square     : a=>a*a, // 제곱
	cube       : a=>a*a*a, // 세제곱
	sqrt       : a=>Math.sqrt(a), // 제곱근
	cbrt       : a=>Math.cbrt(a), // 세제곱근
	sin        : a=>Math.sin(a), // 각종 삼각함수들...
	cos        : a=>Math.cos(a),
	tan        : a=>Math.tan(a),
	csc        : a=>1/Math.sin(a),
	sec        : a=>1/Math.cos(a),
	cot        : a=>1/Math.tan(a),
	asin       : a=>Math.asin(a),
	acos       : a=>Math.acos(a),
	atan       : a=>Math.atan(a),
	acsc       : a=>Math.asin(1/a),
	asec       : a=>Math.acos(1/a),
	acot       : a=>Math.atan(1/a),
	sinh       : a=>Math.sinh(a),
	cosh       : a=>Math.cosh(a),
	tanh       : a=>Math.tanh(a),
	asinh      : a=>Math.asinh(a),
	acosh      : a=>Math.acosh(a),
	atanh      : a=>Math.atanh(a),
	toRadians  : a=>a/180*Math.PI, // 육십분법 -> 호도법
	toDegrees  : a=>a*180/Math.PI, // 호도법 -> 육십분법
	round      : a=>Math.round(a),
	ceil       : a=>Math.ceil (a),
	floor      : a=>Math.floor(a),
	trunc      : a=>Math.trunc(a),
	precise    : a=>{if(a.isBigInt()) return a; let f = 189*10**(9-Math.max(Math.floor(Math.log10(Math.abs(a))),0)), k = Math.abs(Math.abs(a)*f % 1 - 0.5); return k >= 0.498 ? Math.round(a*f)/f : +a},
	modf       : a=>[Math.trunc(a / 1), a % 1],
    hex        : a=>a.toString(16),
    uhex       : a=>a.toString(16).toUpperCase(),
    oct        : a=>a.toString(8),
    bin        : a=>a.toString(2),
    byteCut    : a=>(a & 0xFF) << 24 >> 24,
    int8Cut    : a=>(a & 0xFF) << 24 >> 24,
    int16Cut   : a=>(a & 0xFFFF) << 16 >> 16,
    int24Cut   : a=>(a & 0xFFFFFF) << 8 >> 8,
    int32Cut   : a=>(a & 0xFFFFFFFF),
	hexToNumber : a=>{
		let index = a.indexOf('.'); // 소수점 위치 찾기
		let value = parseInt(a, 16);
		
		if(index == -1) return value; // 소수점 없으면 그대로 반환
		
		let minus = value < 0 || a.trim().charAt(0) == '-';
		
		index++; // 점 뒤로 이동
		let weight = 1/16, digit;
		for(;!isNaN(digit = parseInt(a.charAt(index),16));index++){
			value += minus ? -weight*digit : weight*digit;
			weight /= 16;
		}
		return value;
	},
	octToNumber : a=>parseInt(a, 8),
	binToNumber : a=>parseInt(a, 2),
	decToNumber : a=>parseFloat(a),

	divisors   : a=>{ // 약수
		if(!a.isNumeric()) a = Number(a);
		
		if(!a.isBigInt() && !Number.isSafeInteger(a.valueOf())) return Array.NaA; // 너무 큰 수 적용 불가(랙 방지), 정수가 아닌 경우 등등은 NaA 반환
		
		let array1 = [a.isBigInt() ? 1n : 1];
		let array2 = [a];
		
		
		if(a == 1) return array1;
		
		for(let i=(a.isBigInt() ? 2n : 2);i*i<=a;i++){
			if(a % i == 0){
				array1.push(i);
				if(i*i!=a)
					array2.push(a/i);
			}
		}
		
		return array1.concat(array2.reverse());
	},
	asFraction : (a,lim)=>{
		if(!lim) lim = 2**16;
		var fi = [];
		var m, k;
		var An = 0, Ad = 1, Bn = 1, Bd = 0, Mn, Md, i, kf;
		
		var x = a;
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
	},
	add        :(a,b)=>a.isBigInt() && b.isBigInt() ? a + b : Number(a) + Number(b), // Set에 이미 add가 쓰고 있어서 aug(augment 약자)을 사용함
	aug        :(a,b)=>a.isBigInt() && b.isBigInt() ? a + b : Number(a) + Number(b), // 폐지예정
	padd       :(a,b)=>a.isBigInt() && b.isBigInt() ? a + b : Object.operations.precise(Number(a) + Number(b)),
	paug       :(a,b)=>a.isBigInt() && b.isBigInt() ? a + b : Object.operations.precise(Number(a) + Number(b)),
	sub        :(a,b)=>a-b,
	psub       :(a,b)=>Object.operations.precise(a-b),
	delta      :(a,b)=>b-a,
	pdelta     :(a,b)=>Object.operations.precise(b-a),
	mul        :(a,b)=>a*b,
	pmul       :(a,b)=>Object.operations.precise(a*b),
	div        :(a,b)=>a/b,
	pdiv       :(a,b)=>Object.operations.precise(a/b),
	truediv    :(a,b)=>a%b ? Number(a)/Number(b) : a/b,
	timed      :(a,b)=>b/a,
	ptimed     :(a,b)=>Object.operations.precise(b/a),
	truetimed  :(a,b)=>b%a ? Number(b)/Number(a) : b/a,
	divLim0    :(a,b)=>a==0&&b==0?0:a/b,
	divLim1    :(a,b)=>a==0&&b==0?1:a/b,
	divLimInf  :(a,b)=>a==0&&b==0?1/a/b:a/b,
	mod        :(a,b)=>a%b,
	idiv       :(a,b)=>a.isBigInt() && b.isBigInt() ? a / b : Math.trunc(Number(a)/Number(b)),
	pow        :(a,b)=>a**b,
	powLim0    :(a,b)=>a==0&&b==0?0:a**b,
	powLim1    :(a,b)=>a**b,
	powBase    :(a,b)=>b**a,
	root       :(a,b)=>Math.abs(b % 2) == 1 ? Math.sign(a) * (Math.abs(a) ** (1/b)) : a ** (1/b), // k제곱근, k가 홀수이고 숫자가 음수인 경우
	bitwiseAnd :(a,b)=>a&b,
	bitwiseOr  :(a,b)=>a|b,
	bitwiseXor :(a,b)=>a^b,
	bitwiseLsh :(a,b)=>a<<b,
	bitwiseRsh :(a,b)=>a>>b,
	bitwiseUrsh:(a,b)=>a>>>b,
	least      :(a,b)=>a<b?a:b,
	greatest   :(a,b)=>a>b?a:b,
	center     :(a,b)=>(a+b)/2,         // 두 수의 산술평균
	gcenter    :(a,b)=>Math.sqrt(a*b),  // 두 수의 기하평균
	hcenter    :(a,b)=>2*a*b/(a+parseFloat(b)), // 두 수의 조화평균
	abSub      :(a,b)=>Object.operations.abs(a-b),   // 뺄셈 절댓값
	hAbSub     :(a,b)=>Math.abs(a-b)/2, // 뺄셈 절댓값 절반
	deltaRate  :(a,b)=>(b-a)/a,         // a 대비 변화율
	sqSub      :(a,b)=>(a-b)*(a-b),        // 뺄셈 제곱
	atan2      :(a,b)=>Math.atan2(a,b), // 역탄젠트, 좌표 지정 (y,x)
	hypot      :(a,b)=>Math.hypot(a,b), // 빝변 계산
	logBase    :(a,b)=>Math.log(a) / Math.log(b),

	fractionRound:(a,b)=>Math.round(a * b) / b,
	fractionCeil :(a,b)=>Math.ceil (a * b) / b,
	fractionFloor:(a,b)=>Math.floor(a * b) / b,
	fractionTrunc:(a,b)=>Math.trunc(a * b) / b,

	factorRound  :(a,b)=>Math.round(a / b) * b,
	factorCeil   :(a,b)=>Math.ceil (a / b) * b,
	factorFloor  :(a,b)=>Math.floor(a / b) * b,
	factorTrunc  :(a,b)=>Math.trunc(a / b) * b,

	digitRound   :(a,p)=>p>=0?Object.operations.fractionRound(a,10**p):Object.operations.factorRound(a,10**-p),
	digitCeil    :(a,p)=>p>=0?Object.operations.fractionCeil (a,10**p):Object.operations.factorCeil (a,10**-p),
	digitFloor   :(a,p)=>p>=0?Object.operations.fractionFloor(a,10**p):Object.operations.factorFloor(a,10**-p),
	digitTrunc   :(a,p)=>p>=0?Object.operations.fractionTrunc(a,10**p):Object.operations.factorTrunc(a,10**-p),
	
	gcd          :(a,b)=>{ // 최대공약수
		let t;
		
		while(b){
			t = a % b;
			a = b;
			b = t;
		}
		return a <= 0 ? -a : a;
	},

	lcm          :(a,b)=>Object.operations.abs(a / Object.operations.gcd(a,b) * b), // 최소공배수
	
	toXY         :(a,b)=>[a*Math.cos(b),a*Math.sin(b)],
	toPolar      :(a,b)=>[Math.hypot(a,b),Math.atan2(a,b)],
	_citrans     :(a,b)=>_CITABLE[a*2+2][b+1],
	
	baseString   :(a,b)=>{
                         	try{
								return Number(a).toString(b);
							}catch(e){
								return 'NaN';
							}
                         },
	
	fitInRange :(a,b,c)                    =>Object.operations.least(Object.operations.greatest(a,b),c),
	transform  :(x, a1, b1, a2, b2)        =>(x-a1)*(b2-a2)/(b1-a1)+a2, // 점의 위치를 내(외)분하는 비율에 맞게 변형, BigInt 때문에 곱셈을 먼저 진행
	transCurve :(x, a1, m1, b1, a2, m2, b2)=>((x-a1)/(b1-a1))**(Math.log((m2-a2)/(b2-a2))/Math.log((m1-a1)/(b1-a1)))*(b2-a2)+a2, // 곡선형, 가운데 지점 설정
	transPower :(x, a1, b1, p1, a2, b2, p2)=>((x-a1)/(b1-a1))**(p2/p1)*(b2-a2)+a2, // 곡선형
	transLog   :(x, a1, b1, a2, b2)        =>((Math.log(x)-Math.log(a1))/(Math.log(b1)-Math.log(a1)))*(b2-a2)+a2, // 로그형
	transExp   :(x, a1, b1, a2, b2)        =>Math.exp(((x-a1)/(b1-a1))*(Math.log(b2)-Math.log(a2))+Math.log(a2)), // 지수형
	alphaAdd   :(a, b, alpha)              =>a*(1-alpha)+b*alpha, // 가중합산
	frAlphaAdd :(a, b, anum, aden)         =>(a*(aden-anum)+b*anum)/aden, // 가중합산, 분수타입
	mulDiv     :(a, num, den)              =>a*num/den, // 곱한 후 나누기 (Typed Int에 유용)
	mda        :(a, num, den, bias)        =>a*num/den+bias, // 곱한 후 나누고 더함
	unmda      :(a, num, den, bias)        =>(a-bias)*den/num, // 위의 역연산
	unmdar     :(a, num, den, bias)        =>Math.round((a-bias)*den/num), // 위의 역연산, 반올림 적용
	
};

Object.string = {
	splus      : (a)=>a.isString() ? a : a.toString(),           // 문자열 양수연산 - 변환
	sminus     : (a)=>a.isString() ? a.reverse() : a.toString().reverse(), // 문자열 음수연산 - 뒤집기
	sreciproc  : (a)=>a.split(''),            // 문자열 역수연산 - 분해
	strlen     : (a)=>a.isString() ? a.length : a.toString().length,    // 문자열 크기연산 - 길이
	sadd       : (a,k)=>(a.isString() ? null : a = a.toString(), a.concat(k)),          // 문자열 덧셈연산 - 결합
	ssub       : (a,k)=>(a.isString() ? null : a = a.toString(), a.replaceAll(k,'')),   // 문자열 뺄셈연산 - 제외
	smul       : (a,k)=>{                     // 문자열 곱셈연산 - 반복, 소수점 사용 가능
		try{
			if(!a.isString()) a = a.toString();
			let [i, f] = Object.operations.modf(Math.abs(parseFloat(+k))); f = Math.round(f * a.length); return k>=0?a.repeat(i).concat(a.substr(0,f)) : a.substr(a.length-f).concat(a.repeat(i)).reverse();
		}catch(e){return '#'+e.toString();}
	},
	sdiv       : (a,k)=>{
		if(!a.isString()) a = a.toString();
		if(k.isNumber()){ // 수로 나눌 경우 해당 개수로 절단
			let arr = [];
			if(k > 0){ // 양수는 앞에서부터
				for(let i=0;i<a.length;i+=k){
					arr.push(a.slice(i,i+k));
				}
			}else if(k < 0){ // 음수는 뒤에서부터
				for(let i=0;i>-a.length;i+=k){
					arr.push(a.slice(i+k,i?i:Infinity));
				}
				arr.reverse();
			}else{ // 0으로 나누는 것은 NaA 반환
				return Array.NaA;
			}
			
			return arr;
		}
		return a.split(k);
	},
	smod       : (a,k)=>(a.isString() ? null : a = a.toString(), k>=0?a.slice(0,k):a.slice(k)),
	slrot      : (a,k)=>(a.isString() ? null : a = a.toString(), a.slice(k).concat(a.slice(0,k))),
	srrot      : (a,k)=>(a.isString() ? null : a = a.toString(), a.slice(-k).concat(a.slice(0,-k))),
};

// [similar/exact] 관련

// 숫자에서는 0.1.add(0.2).similar(0.3) 이렇게 숫자가 비슷하면 참으로 처리
// 문자에서는 대/소문자를 구별하지 않고 처리 (대문자로 취급)
// 숫자,문자 혼합시 제대로 계산이 되지 않을 수 있음


Object.comparison = {
	numeric:{
		isOdd:(a)=>Math.abs(a) % 2 == 1,
		isEven:(a)=>a % 2 == 0,
		isPositive:(a)=>a > 0,
		isNegative:(a)=>a < 0,
		isZero:(a)=>a.valueOf() == 0,
		isNaN:(a)=>isNaN(a),
		isFinite:(a)=>isFinite(a),
		isInfinite:(a)=>!isNaN(a) && !isFinite(a),
		isPrime:(a)=>
		{ // 소수 여부
			if(!Number.isSafeInteger(a.valueOf())) return false; // 너무 큰 수 적용 불가(랙 방지), 정수가 아니거나 1은 소수로 취급 안함
			for(let i=2;i*i<=a;i++){
				if(a % i == 0) return false;
			}
			return true;
		},
		isCoprime:(a,b)=>Object.operations.gcd(a,b) == 1,
	},
	sizing:{ // 크기 비교
		// 일반 비교 연산자
		less:(a,b)=>a.valueOf()<b.valueOf(),
		greater:(a,b)=>a.valueOf()>b.valueOf(),
		leq:(a,b)=>a.valueOf()<=b.valueOf(),
		geq:(a,b)=>a.valueOf()>=b.valueOf(),
		// 오차 허용 비교 연산자
		exactLess:(a,b)=>Object.operations.pou(a)<Object.operations.pou(b),
		exactGreater:(a,b)=>Object.operations.pou(a)>Object.operations.pou(b),
		exactLeq:(a,b)=>Object.operations.pou(a)<=Object.operations.pou(b),
		exactGeq:(a,b)=>Object.operations.pou(a)>=Object.operations.pou(b),
		// 논리형이 아닌 비교 연산자
		compare:(a,b)=>{let A=a.valueOf(), B=b.valueOf(); return A<B?-1:A>B?1:A==B?0:NaN;},
		similarCompare:(a,b)=>{let A=Object.operations.pou(a), B=Object.operations.pou(b); return A<B?-1:A>B?1:A==B?0:NaN;},
		inRange:(a,u,v,boundary)=>{ // 해당 범위 이내로 들어왔는지 체크, boundary는 경계선으로 수학에서 쓰던 기호와 동일
			if(boundary === undefined) boundary = '[]';
			switch(boundary){
				// 범위 내
				case '()':
				return u<a && a<v;
				case '[)':
				return u<=a && a<v;
				case '[]':
				return u<=a && a<=v;
				case '(]':
				return u<a && a<=v;
				// 범위 외
				case ')(':
				return a<u || a>v;
				case ')[':
				return a<u || a>=v;
				case '][':
				return a<=u || a>=v;
				case '](':
				return a<=u || a>v;
				default:
				return false;
			}
		},
	},
	equality:{ // 상등 비교
		equal:(a,b)=>a.valueOf()==b.valueOf(),
		notEqual:(a,b)=>a.valueOf()!=b.valueOf(),
		
		// 타입 일치 비교 연산자
		identical:(a,b)=>a.valueOf()===b.valueOf(),
		notIdentical:(a,b)=>a.valueOf()!==b.valueOf(),
		
		similar:(a,b)=>Object.operations.pou(a)==Object.operations.pou(b),
		notSimilar:(a,b)=>Object.operations.pou(a)!=Object.operations.pou(b),
	},
};


Object.logical = {
	not:(a)=>!a.valueOf(),
	boolean:(a)=>!!a.valueOf(),
	and:(a,b)=>a.valueOf()&&b.valueOf(),
	or :(a,b)=>a.valueOf()||b.valueOf(),
	xor:(a,b)=>a.valueOf()&&b.valueOf() ? false : a.valueOf()||b.valueOf(),
	nand:(a,b)=>!(a.valueOf()&&b.valueOf()),
	nor:(a,b)=>!(a.valueOf()||b.valueOf()),
	xnor:(a,b)=>!(a.valueOf()||b.valueOf()) ? true : a.valueOf()&&b.valueOf(),
	eqv:(a,b)=>!(a.valueOf()||b.valueOf()) ? true : a.valueOf()&&b.valueOf(), // xnor == eqv
};

Object.other = {
	pou:(a)=> (a = a.valueOf(), typeof a == 'string' ? a.toUpperCase() : Object.operations.precise(a)), // 숫자는 정밀화, 영문은 대문자화
	pack1:(a   )=> [a],
	pack2:(a,b )=> [a, b],
	packs:(...A)=> [...A],
};


class NAObject{ // 예기치 못한 오류를 방지하기 위한 특별값, 원래 값으로 반환 시 valueOf를 반환
	
};

const NA = new NAObject(); // 빈 클래스라도 일단은 생성



// 모든 연산자를 구별 없이 가능하도록 조치
Object.assign((Object.operations = {}), 
	Object.arithmetic, Object.string, Object.comparison.numeric, Object.comparison.sizing, Object.comparison.equality, Object.logical, Object.other
);

// 네이티브 메소드를 전 오브젝트로 확장
for(const ob of [String.prototype.padStart, String.prototype.padEnd, String.prototype.concat, String.prototype.toLowerCase, String.prototype.toUpperCase, String.prototype.trim, String.prototype.split]){
	Object.defineProperty(Object.prototype, ob.name, {enumerable:false, writable:true, value:ob});
};

/*

이터러블-스칼라 연산

5..sub(5)  // 단순히 5과 5를 빼서 0 반환
5..$sub(5) // 왼쪽을 이터러블, 오른쪽을 스칼라로 처리, [0-5,1-5,2-5,3-5,4-5] = [-5,-4,-3,-2,-1]
5..sub$(5) // 왼쪽을 이터러블, 오른쪽을 이터러블로 처리, [5-0,5-1,5-2,5-3,5-4] = [5,4,3,2,1]
5..$sub$(5)// 양쪽을 이터러블로 처리, [0-0,1-1,2-2,3-3,4-4] = [0,0,0,0,0], 사이즈 일치 필수

배열의 경우

[5,7].pow([2,3]) = [25, 343] // 배열의 규칙에 따라 각각 연산함
[5,7].$pow([2,3]) = [5..pow([2,3]), 7..pow([2,3])] = [[25,125],[49,343]]
[5,7].pow$([2,3]) = [[5,7].pow(2), [5,7].pow(3)] = [[25,49],[125,343]]
[5,7].$pow$([2,3]) = [5..pow(2), 7..pow(3)] = [25, 343]

문자열의 경우

'ab'.sadd('cd') = 'abcd'
'ab'.$sadd('cd') = ['acd', 'bcd']
'ab'.sadd$('cd') = ['abc', 'abd']
'ab'.$sadd$('cd') = ['ac', 'bd']

단항 연산, 리듀싱 연산은 앞에 $만 가능함

5..$minus() // [-1,-2,-3,-4,-5]
5..$add()   // 10

삼항 이상의 연산은 괄호의 첫 인자에만 적용됨

5..alphaAdd$(10,0.7) // [7,7.3,7.6,7.9,8.2]

5..alphaAdd(0.._10,0.7) // [1.5,2.2,2.9,3.6,4.3,5,5.7,6.4,7.1,7.8]

일반 연산

5..call((x,y)=>4*x+7*y, 5) // 4*5+7*5 = 55
5..$call((x,y)=>4*x+7*y, 5) // [35,39,43,47,51]
5..call$((x,y)=>4*x+7*y, 5) // [20,27,34,41,48]
5..$call$((x,y)=>4*x+7*y, 5) // [0,11,22,33,44]

앞 뒤에 _ 를 각각 붙여서 Operator Overloadable JS 에 대비
5.._add_(8) = 13
new Date()._div_(1000) = 1658884563.03 (계속 변함, valueOf가 Primitive한 모든 객체에 적용가능)

Normal JS:

[10,23] * [8,42] = NaN

Operator Overloadable JS:

[10,23] * [8,42] = [80,966]
-> [10,20]._mul_([8,42]) 로 해석함


*/

for(const op in Object.operations){
	//if(Object.operations[op].length)
	Object.defineProperty(Object.prototype, '$'+op, {enumerable:false, writable:true, value:function(...args){
		let array = [];
		for(const e of this){
			array.push(e[op](...args));
		};
		return array;
	}});
	Object.defineProperty(Object.prototype, op+'$', {enumerable:false, writable:true, value:function(...args){
		let array = [];
		let cdr = args.slice(1);
		for(const e of args[0]){
			array.push(this[op](e, ...cdr));
		};
		return array;
	}});
	Object.defineProperty(Object.prototype, '$'+op+'$', {enumerable:false, writable:true, value:function(...args){
		let array = [];
		let it = this[Symbol.iterator](), info = it.next();
		let cdr = args.slice(1);
		for(const e of args[0]){
			if(info.done) throw new SizeMismatchError('좌변이 먼저 종료되었습니다.');
			array.push(info.value[op](e, ...cdr));
			info = it.next();
		};
		if(!info.done) throw new SizeMismatchError('우변이 먼저 종료되었습니다.');
		return array;
	}});
	Object.defineProperty(Object.prototype, '_'+op+'_', {enumerable:false, writable:true, value:function(...args){
		return this.valueOf()[op](...args);
	}});
	
}

for(const op of ['call', 'safeCall']){
	Object.defineProperty(Object.prototype, '$'+op, {enumerable:false, writable:true, value:function(what, ...args){
		try{
			let array = [];
			for(const e of this){
				array.push(e[op](what, ...args));
			};
			return array;
		}catch(e){
			if(op == 'safeCall') return e; // 안전호출의 경우 이 것도 역시 안전처리를 하고 아니면 그대로 에러 발생
			throw e;
		}
	}});
	Object.defineProperty(Object.prototype, op+'$', {enumerable:false, writable:true, value:function(what, ...args){
		try{
			let array = [];
			let cdr = args.slice(1);
			for(const e of args[0]){
				array.push(this[op](what, e, ...cdr));
			};
			return array;
		}catch(e){
			if(op == 'safeCall') return e;
			throw e;
		}
	}});

	Object.defineProperty(Object.prototype, '$'+op+'$', {enumerable:false, writable:true, value:function(what, ...args){
		try{
			let array = [];
			let it = this[Symbol.iterator](), info = it.next();
			let cdr = args.slice(1);
			for(const e of args[0]){
				if(info.done) throw new SizeMismatchError('우변이 먼저 종료되었습니다.');
				array.push(info.value[op](what, e, ...cdr));
				info = it.next();
			};
			if(!info.done) throw new SizeMismatchError('좌변이 먼저 종료되었습니다.');
			return array;
		}catch(e){
			if(op == 'safeCall') return e;
			throw e;
		}
	}});
}





// 일반 객체에 대해서도 연산 가능하도록 조치
// 배열 내부 연산 백엔드는 .unary, .binary 등을 주어서 다시 작성하지 않아도 모든 연산이 가능하도록 조치
/*
for(let op in Object.operations){
	Object.defineProperty(Object.prototype, op, {enumerable:false, writable:true, value:function(...args){
		if(this.isArray()){ // 배열인 경우
			switch(Object.operations[op].length){
				case 1:  return this.unary(op, );
				case 2:  return this.binary(op, args[0]);
				default: return this.ternary(op, ...args);
			}
		} // 배열이 아닌 경우
		if(args.length && args.some(x=>x.isArray())){ // 배열간 연산시 배열 연산 시행, 배열로 변환 후 위를 재귀 실행
			if(args.every(x=>x.isTypedArray())) // 모두 형식이 있는 배열은 Float64기반 연산
				return new Float64Array([this])[op](...args);
			else // 그 외는 일반 배열 연산
				return [this][op](...args);
		}else // 배열이 아닌 경우 숫자연산
			return Object.operations[op](this.valueOf(), ...args); // 숫자 연산 진행
	}});
}
*/

Object.makeCalculable = function(Class){ // 계산가능한 객체를 만들기 위한 것으로 Object.makeCalculable(클래스명) 으로 호출
	for(const op in Object.operations){
		Object.defineProperty(Class.prototype, op, {enumerable:false, writable:true, value:function(...args){
			if(this.isArray()){ // 배열인 경우
				switch(Object.operations[op].length){
					case 1:  return this.unary(op, );
					case 2:  return this.binary(op, args[0]);
					default: return this.ternary(op, ...args);
				}
			}
			if(this.isMap()){
				return this.operation(op, ...args);
			}
			// 배열이 아닌 경우
			if(args.length && args.some(x=>x.isArray())){ // 배열간 연산시 배열 연산 시행, 배열로 변환 후 위를 재귀 실행
				if(args.every(x=>x.isTypedArray())) // 모두 형식이 있는 배열은 Float64기반 연산
					return new Float64Array([this])[op](...args);
				else // 그 외는 일반 배열 연산
					return [this][op](...args);
			}else{ // 배열이 아닌 경우 숫자연산
				if(this.valueOf().isBigInt() || args.some(x=>x.valueOf().isBigInt())){ // 큰수 발견 시
					try{
						return Object.operations[op](this.valueOf(), ...args); // 일단 연산 진행
					}catch(e){
						console.warn(new TypeWarning(e.message.replace('must','should')+'\nNumber 타입으로 모두 형변환 하여 다시 계산하였습니다.'));
						return Object.operations[op](Number(this), ...args.map(x=>x.valueOf().isBigInt() ? Number(x) : x)); // 숫자 연산 진행
					}
				}
				return Object.operations[op](this.valueOf(), ...args); // 큰수 없을 시 일반연산 진행
			}
		}});
	}
};

for(const Class of [Number, Boolean, BigInt, String, Array, Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, Error, NAObject, Map]){
	
	Object.makeCalculable(Class);
	
}
// 오류가 발생하여 필요한 일부 클래스로 축소, d3.js에서 if('xxx' in xxx) 에 문제가 있었는 모양


// 기저 메소드 추가 후 NA, Error 등에 해당 정보를 추가함
Object.assign(NAObject.prototype, {
	toStringEx:function(){return 'N/A';},
	
	less:function(k){return false;},
	greater:function(k){return false;},
	leq:function(k){return false;},
	geq:function(k){return false;},
	exactLess:function(k){return false;},
	exactGreater:function(k){return false;},
	exactLeq:function(k){return false;},
	exactGeq:function(k){return false;},
	
	not:function(){return true;},
	boolean:function(){return false;},
	
	inRange:function(){return false;},
	
	isNA:function(){return true;},
	
	count:function(){return 1;},
	validCount:function(){return 0;},
	strlen:function(){return this;},
	
	parseInt:function(){return NaN;},
	parseFloat:function(){return NaN;},
	typeof:'na',
	naValue:function(v){return v.isGeneralArray() ? [this].naValue(v) : v;},
	naValueObject:function(v){return v;},
	
	NAtoNaN:function(){return NaN;},
	valueOf:function(){return NaN;},
});
Object.assign(Error.prototype, NAObject.prototype); // 에러 객체도 NA와 동일한 것으로 간주


// 일치 비교 연산자는 객체 자체로도 비교 가능하도록 별도 조치

for(let op in Object.comparison.equality){
	Object.defineProperty(Object.prototype, op+'Object', {enumerable:false, writable:true, value:function(...args){
		return Object.operations[op](this, ...args); // 통째 비교이므로..
	}});
};



//Error도 N/A로 취급

// isXXX 에서 false인 것은 이제 필요 없다!


NA.toString = function(){return 'N/A';};
Error.prototype.toStringEx = function(){return 'N/A ('+this.toString()+')';};

Error.prototype.getReasonVariable = function(){ // 문제가 발생한 변수 반환
	try{
		if(/\'[A-Za-z_$0-9]+\'/.test(this.message))
			return this.message.match(/\'[A-Za-z_$0-9]+\'/).toString().slice(1,-1);
		return this.message.match(/[A-Za-z_$0-9]+ is/).toString().slice(0,-' is'.length);
	}catch(e){
		return '';
	}
};

Error.prototype.__defineGetter__('stackArray', function(){
	try{
	return this.stack.split('\n').slice(1).map(x=>x.trim().slice(3));
	}catch(e){return [];}
});

Function.prototype.isFunction = function(){return true;};

Error.try = function(fn, ...args){try{return fn(...args);}catch(e){return e;}}


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

/*

가중덧셈
- 뒤 인자에 해당 인자의 가중치, 알파값을 적으며, 계산 공식은 A(1-α)+Bα

[40,60,58,37].alphaAdd([32,29,65,81], 0.7) = [34.4,38.3,62.9,67.8] = [40*0.3+32*0.7,...]
[40,60,58,37].alphaAdd([32,29,65,81], 0.2) = [38.4,53.8,59.4,45.8]

*/


// 숫자에서의 문자열 연산, 곱셈을 적용하는 특별한 경우 제외 모두 문자열과의 연산이므로 모두 문자열로 위탁함


// 진법 변환하여 문자열로





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
	if(k.isGeneralArray()) return [this].sfmt(k);
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



/*

<< 숫자 반복자 >>

- 양수 상승 카운터 -

0부터 n-1까지 반복한다.

for(let i of 10){
	console.log(i);
}; // 0부터 9까지 출력

console.log([...5]); // [0, 1, 2, 3, 4]


- 음수 상승 카운터 -

n부터 -1까지 반복한다.

for(let i of -10){
	console.log(i);
}; // -10부터 -1까지 출력

console.log([...-5]); // [-5, -4, -3, -2, -1]

** 0을 입력할 경우 빈 값이다. []은 [...0] 과 같다.


- 양수 하강 카운터 -

n-1부터 0까지 반복한다. for문 예제는 생락한다.

console.log([...5..down]); // [4, 3, 2, 1, 0]


- 음수 하강 카운터 -

-1부터 n까지 반복한다. 주의사항! 리터럴에 음수를 쓸 경우 반드시 괄호를 묶고 괄호뒤 점은 1개를 쓴다.

console.log([...(-5).down]); // [-1, -2, -3, -4, -5]

** 0을 입력할 경우 빈 값이다. []은 [...0..down] 과 같다.


- 구간 지정 카운터 -

시점부터 종점-1까지 1씩 증가하여 반복한다.
0 부터 99까지는 괄호를 생략할 수 있고 음수 또는 100 이상, 리터럴이 아니면 괄호를 필요로 한다.

for(let i of 10.._30){
	console.log(i);
} // 10부터 29까지 출력

for(let i of 100.._(1000)){
	console.log(i);
} // 100부터 999까지 출력

거꾸로 가는 경우는 -1부터 시작하여 1씩 차감하고 해당 값까지 적용한다.

for(let i of 30.._10){
	console.log(i);
} // 29부터 10까지 출력

숫자가 일치하는 경우는 반복을 하지 않는다.

for(let i of 10.._10){
	console.log(i);
} // 아무 것도 출력되지 않는다

배열로도 쉽게 수를 표현할 수 있다.

console.log([...10.._20])

리터럴이 아닌 경우는 to를 사용하는 것이 권장됨

for(let i of a.to(b)){
}

for(let i of a._(b)){
}

당연히 전자가 가독성이 좋음

       == 중요 주의사항 ==
★ 증가하는 경우는 도착점을 제외 ★
★ 감소하는 경우는 출발점을 제외 ★

해당 카운터는 수열 형태의 객체로 생성함으로써 1.._16.sum() = 120 과 같은 연산 수행 가능


- 응용 -

문제 : let [a, b, c] = 3; 일 때 a, b, c 의 값은?
정답 : a=0, b=1, c=2
해설 : 위의 반복자의 원리에 따른다.

문제 : let [a, [b, c], [d, e]] = 3; 일 때 a, b, c, d, e의 값은?
정답 : a=0, b=0, c=undefined, d=0, e=1
해설 : [b, c] = 1, [d, e] = 2를 적용한다.


<< 간단 반복자 >>

Python의 List Comprehension 과 비슷한 형식
PY : [x*10 for x in range(10) if x%3]
JS : [...$for(10, x=>x*10, x=>x%3)]
결과 [10, 20, 40, 50, 70, 80]

그럼 2중 List Comprehension은?
PY : [x*y for x in range(5) for y in range(5) if (x+y)%5 in (2, 4)]
JS : [...$for([5, 5].multi, ([x,y])=>x*y, ([x,y])=>[2,4].indexOf((x+y)%5)+1)]
결과 [0, 0, 1, 3, 0, 4, 3, 12, 0, 12]

Multi Iterator는 [0] 이 맨 겉, [length-1] 이 맨 속 루프를 의미한다.


<< 멀티 반복자 >>

- 요소가 모두 iterable한 배열에 한하여 가능하다.
- [0] 은 가장 겉, [N-1] 은 가장 속의 깊이이다.
- 반환 값은 각각을 하나하나씩 집어 묶은 배열

for(let [i,j] of [[1,4],[2,8]].multi){
	console.log(`i=${i}, j=${j}`);
}

i=1, j=2
i=1, j=8
i=4, j=2
i=4, j=8


- 주의사항: multi 없이 쓰는 경우

for(let [i,j] of [[1,4],[2,8]]){
	console.log(`i=${i}, j=${j}`);
}

i=1, j=4
i=2, j=8


- 위를 융합해서 이런 것도 가능

for(let [i,j,k] of [3,4,2].multi){
	console.log(`i=${i}, j=${j}, k=${k}`);
}

for(let [i,j,k] of [3,4,2]){
	console.log(`i=${i}, j=${j}, k=${k}`);
}

[... [['딸기','메론'],['바나나','레몬'],['쥬스','에이드']].multi].inner.sadd()
[... [['딸기','메론'],['바나나','레몬'],['쥬스','에이드']]].inner.sadd()
[... [['서울','대구','부산'],1.._5,['호선']].multi].inner.sadd()


<< 클래스 반복자 >>

Boolean : false, true를 선회
Number  : 0부터 무제한 선회, [...Number] 사용을 금하며, let [a, b, c] = Number 에 사용됨
BigInt  : Number와 동일, 다만, BigInt타입임

Boolean.down : true, false를 선회
Number.down  : -1부터 무제한 음수 선회
BigInt.down  : Number와 동일, 다만 BigInt 타입임


<< 수열 클래스 >>

Numbers     : 등차수열 형태로 계산
XxxSequence : 구간을 나눠서 계산, 자동 정밀화 포함 (NumPy의 np.xxxspace와 동일)
Series      : 다항식을 제공하는 수열, 예정
Python의 Range와는 유사하나 단계에서 음수를 지정할 시 확실한 차이

[...new Numbers(5)] = [0,1,2,3,4]
[...new Numbers(2,7)] = [2,3,4,5,6]
[...new Numbers(2,7,-1)] = [6,5,4,3,2] // 음수 스텝이여도 시작과 끝은 양수 범위와 동일하게 적어야 함
[...new Numbers(2,8,2)] = [2,4,6]  // 처음부터 2칸씩 건너뛰기
[...new Numbers(2,8,-2)] = [7,5,3] // 끝부터 2칸씩 건너뛰기

[...new LinSequence(1,10)] = [1,2,3,4,5,6,7,8,9,10]       // 1부터 10까지 10등분
[...new LinSequence(1,5,9)] = [1,1.5,2,2.5,3,3.5,4,4.5,5] // 1부터 5까지 9등분
[...new LinSequence(10,20,5,false)] = [10,12,14,16,18]    // 끝접 불포함

이 객체는 모두 .slice(), .at(), .length, .map(), .reduce() 등을 쓸 수 있으며,
.reverse()를 적용 시에는 step이 -1이 곱해지는 것 외에도 시작점 또는 끝점이 달라질 수 있다.
위와 같이 new Numbers(2,8,2) 와 new Numbers(2,8,-2) 는 반대 방향으로는 서로 다르기에
이를 처리할 경우 new Numbers(2,7,-2) 로 처리된다.
반대로 new Numbers(2,8,-2) 의 경우는 new Numbers(3,8,2) 이다.
.value는 읽기 전용으로 해당 배열을 반환한다. (== .toArray())
배열과는 달리 ArrayBoundaryError를 발생시키지 않으나 .length는 존재.
다만, 음수 at을 쓸 경우에는 오른쪽 끝이 아닌 왼쪽 밖으로 계산된다. 오른쪽도 마찬가지.
예 : new LinSequence(11,20,10).at(-5) = 6
at, .val에 소수점을 쓸 수 있다.
에 : new LinSequence(11,20,10).at(1.5) = 12.5

반복문 예제
{
	let oddSum = 0;
	let evenSum = 0;
	for(let i of new LinSequence(10,50,9)){
		if(i % 2 == 0) evenSum += i;
		else oddSum += i;
	}
	[oddSum, evenSum];
}

XxxSequence : ([지수또는함수,] 시점, 종점, 개수, 종점포함여부)
LinSequence : 선형
PowSequence : 거듭제곱
ExpSequence : 지수


[예제]

new PowSequence(2, 1, 25, 5)            = [1,4,9,16,25]
new ExpSequence(1, 16, 5)               = [1,2,4,8,16]

[숫자 내부에서 사용]
- 개수를 숫자 객체로 지정하고, 앞 글자를 소문자로 한다.

5..linSequence(1, 81)    // new LinSequence(1, 81, 5) 와 동일
5..expSequence(1, 81)    // new ExpSequence(1, 81, 5) 와 동일
5..powSequence(2, 1, 81) // new PowSequence(2, 1, 81, 5) 와 동일


[Sequence도 Array의 일종]
- .map, .reduce, .filter 등도 구현이 되어 있어서 대부분 Array의 기능을 이용할 수 있다
- .slice 의 경우는 현재는 Array로 반환되었으나,
  추후 시/종점이 조정된 서브시퀀스 반환 예정.
  개정 전후 상관없이 .value를 쓰면 문제 없음
- 다만 데이터 설정 메소드의 경우는 특성상 규칙에 따라 저장되어야 한다
- 시점이 변경되면 종점 제외 나머지 값에 영향을 미치고 종점도 마찬가지 
- 그 사잇값 변경될 시 해당 비율을 계산해서 시, 종점을 바꾸어 나머지 값에 영향 발생, 현재 값도 오차가 있으나 보정
- 2개의 값을 동시에 변경할 경우(.set2p(a,b,value)) 해당 점을 통과하는 직(곡)선에 따라서 시점, 종점 y값 재계산
- 3개 이상을 변경하는 것은 미제공
- 특성상 .toArray() 로 변환할 수는 있으나 .toSequence() 등으로는 불가

[Sequence를 사용하면 좋은 이점]
- 메모리 절약
- 수행속도 향상
- 단점: 규칙에 따라서 저장됨, 즉 불규칙한 수열은 일반배열 사용


*/

Boolean[Symbol.iterator] = function*(){
	yield false;
	yield true;
};

Number[Symbol.iterator] = function*(){
	let i = -1;
	while(1)
		yield ++i;
};

BigInt[Symbol.iterator] = function*(){
	let i = -1n;
	while(1)
		yield ++i;
};

Boolean.down = {
	[Symbol.iterator]:function*(){
		yield true;
		yield false;
	}
};

Number.down = {
	[Symbol.iterator]:function*(){
		let i = 0;
		while(1)
			yield --i;
	}
};

BigInt.down = {
	[Symbol.iterator]:function*(){
		let i = 0n;
		while(1)
			yield --i;
	}
};




Number.prototype[Symbol.iterator] = function*(){ // 더 간단한 버전, for(let i of 10) 이런식으로... 0부터 현재숫자-1까지 반복
	let that = this;
	if(this >= 0){
		for(let i=0;i<this;i++){
			yield i;
		}
	}else{
		for(let i=this;i<0;i++){
			yield i;
		}
	}
};

Number.prototype.__defineGetter__('down', function(){ // 현재숫자-1부터 0까지 반복자 반환
	return {
		number: this.valueOf(),
		[Symbol.iterator]:function*(){
			let that = this.number;
			if(this.number >= 0){
				for(let i=this.number-1;i>=0;i--) yield i;
			}else{
				for(let i=-1;i>=this.number;i--) yield i;
			}
		},
	};
});


for(const to of 102){
	Number.prototype.__defineGetter__('_'+to, function(){
		const from = this.valueOf();
		return from < to ? new Numbers(from, to) : new Numbers(to, from, -1);
	});
}

Number.prototype.to = 
Number.prototype._ = function(to){
	const from = this.valueOf();
	return from < to ? new Numbers(from, to) : new Numbers(to, from, -1);
};

function $for(iterated, valueF, condF){
	if(iterated === undefined) throw new TypeError('피반복자(iterated) 생략 불가');
	if(valueF === undefined) valueF = identical;
	if(condF === undefined) condF = x=>true;
	return {
		currIt: iterated[Symbol.iterator](),
		[Symbol.iterator]:function(){
			let that = this;
			return{
				next: () => {
					let info = that.currIt.next();
					while(!info.done && !condF(info.value)) info = that.currIt.next();
					if(info.done) return {done:info.done};
					return {value:valueF(info.value), done:info.done};
				}
			};
		},
		valueOf(){return [...this];},
		get value(){return [...this];},
		toString(){return `$for(${iterated}, ${valueF}, ${condF})`;},
	};
}




Array.prototype.__defineGetter__('multi', function(){
	let its = this.map(x=>x[Symbol.iterator]());
	let infos = its.map(x=>x.next());
	let that = this;
	
	return {
		[Symbol.iterator]:function(){
			return{
				next: () => {
					if(infos[0].done) return {done:true};
					let ob = {done:false, value:infos.map(x=>x.value)};
					
					for(let i of its.length.down){
						infos[i] = its[i].next();
						if(infos[i].done){
							for(let j of i.to(its.length)){
								if(j) its[j] = that[j][Symbol.iterator]();
								infos[j] = its[j].next();
							}
						}else break;
					}
					
					return ob;
				},
			};
		},
		valueOf(){return [...this];},
		get value(){return [...this];},
		toString(){try{return `${that}.multi`;}catch(e){return e.toString();}},
	};
});

class SequenceIndexing{ // 숫자 첨자를 계산하기 위한 조치, .val 떼기
	constructor(){
		return this.proxy = new Proxy(this, {
			get: (object, key) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					return object.at(key);
				}
				return Reflect.get(object, key);
			},
			has: (object, key) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					return true;
				}
				return Reflect.has(object, key);
			},
		});
	}
};

class AbstractSequence extends SequenceIndexing{ // 아래 같은 부분을 또 다시 쓰는 것을 차단, 상속 적용
	constructor(){
		super();
		if(new.target == AbstractSequence){
			throw new TypeError('추상 클래스는 생성이 불가합니다.');
		}
	};
	// at, setAt 은 직접 구현하고 그것을 기반으로 실행
	
	// 주의!! 일반 slice와는 다른 사용 방법!
	// a 또는 b가 음수라도 끝에서부터 하는 것이 아닌 왼쪽 밖으로 계산됨
	// 예시 : [...new Numbers(10, 15)].slice(-2,6) = [13,14] 이지만,
	// new Numbers(10, 15).slice(-2,6) = [8,9,10,11,12,13,14,15] 이다. .at(-2) ~ at(5) 까지 계산
	// 배열에서 빌려서 계산 시 0.._(Infinity) 에서는 엄청 오랜시간 소요되며(무제한) 위와 같은 규칙에 따라 별도로 계산함
	
	slice(a,b){ 
		let ar = [];
		for(let i of a.to(b)){
			ar.push(this.at(i));
		}
		return ar;
	};
	forEach(fn){
		for(let i of this.length){
			fn(this.at(i), i, this);
		}
	};
	map(fn){
		let ar = [];
		for(let i of this.length){
			ar.push(fn(this.at(i), i, this));
		}
		return ar;
	};
	reduce(fn, init){
		if(init===undefined){
			if(this.length <= 0) return NA;
			let y = this.at(0);
			for(let i of 1.._(this.length)){
				y = fn(y, this.at(i), i, this);
			}
			return y;
		}
		let y = init;
		for(let i of this.length){
			y = fn(y, this.at(i), i, this);
		}
		return y;
	};
	reduceRight(fn, init){
		if(init===undefined){
			if(this.length <= 0) return NA;
			let y = this.at(this.length-1);
			for(let i of (this.length-1).down){
				y = fn(y, this.at(i), i, this);
			}
			return y;
		}
		let y = init;
		for(let i of this.length.down){
			y = fn(y, this.at(i), i, this);
		}
		return y;
	};
	filter(fn){
		let ar = [], tv;
		for(let i of this.length){
			tv = this.at(i);
			if(fn(tv)) ar.push(tv);
		}
		return ar;
	};
	some(fn){
		let ar = [];
		for(let i of this.length){
			if(fn(this.at(i))) return true;
		}
		return false;
	};
	every(fn){
		let ar = [];
		for(let i of this.length){
			if(!fn(this.at(i))) return false;
		}
		return true;
	};
	*[Symbol.iterator](){
		for(let i of this.length) yield this.at(i); 
	};
	valueOf(){ // 일반 배열로 반환
		return [...this];
	};
	toString(){ // Sequence 타입은 시작점과 끝점만 표시
		return this.at(0) + '~' + this.at(this.length-1)
	};
	toStringEx(){
		return '['+this.at(0) + '~' + this.at(this.length-1)+']';
	};
	toArray(){
		return [...this];
	};
	toFloat64Array(){
		return new Float64Array([...this]);
	};
	isArray(){ // 수열도 배열로 취급
		return true;
	};
	isSequence(){
		return true;
	};
	get value(){ // 읽기전용
		return [...this];
	};
	
	// << 통계 메소드 >>
	// 수열의 이점을 살리기 위해 등차수열의 합 공식 등에 의해 내부 알고리즘이 변경될 수 있음
	// 기본적으로는 일일이 계산한다.
	
	sum(){ return this.add(); }
	mean(){return this.sum() / this.length;};
	var(){
		let mean = this.mean();
		return this.reduce((a,b)=>a + (b-mean)*(b-mean),0).div(this.length);
	};
	stdev(){
		let mean = this.mean();
		return this.reduce((a,b)=>a + (b-mean)*(b-mean),0).div(this.length).sqrt();
	};
	sumprod(other){
		return other === undefined ? this.mul().sum() : this.mul(other).sum();
	};
	N(){
		return this.length;
	};
	max(){
		return this.greatest();
	};
	min(){
		return this.least();
	};
	pick(indices){
		let that = this.proxy;
		if(indices.isArray()){
			return indices.map(x=>that[x]);
		}
		return that[indices];
	};
};

Object.makeCalculable(AbstractSequence);

class Numbers extends AbstractSequence{ // 인덱스용 숫자 생성
	constructor(start, end, step){
		super();
		if(end === undefined){
			this.start = 0;
			this.end = start;
			this.step = 1;
			return;
		};
		this.start = start ?? 0;
		this.end = end ?? 0;
		this.step = step ?? 1;
		if(this.step == 0) throw new RangeError('간격(step)은 0이 될 수 없음');
	};
	at(idx){
		if(Number.isInteger(this.step))
			return (this.step > 0 ? this.start + idx * this.step : this.end - 1 + idx * this.step);
		return (this.step > 0 ? this.start + idx * this.step : this.end - 1 + idx * this.step).precise();
	};
	get length(){
		if(this.step > 0)
			return ((this.end - this.start)/this.step).precise().ceil();
		else
			return ((this.end-1 - this.start)/-this.step + 1).precise().floor();
	};
	comb(factor){ // Array의 comb와는 조금 다른 방식을 적용함 (실수일 때 적용)
		return new Numbers(this.start, this.end, this.step * factor);
	};
	reverse(){
		return new Numbers(this.start, (this.at(this.length-1)+1).precise(), -this.step);
	};
	reverseCopy(){
		return this.reverse();
	};
	toLinSequence(){ // LinSequence로 변환, 기본 폐구간 취급
		return new LinSequence(this.at(0), this.at(this.length-1), this.length);
	};
	
	// 빠른 계산을 위한 특별 규칙 적용
	add(other){
		return this.toLinSequence().add(other);
	};
	aug(other){
		return this.toLinSequence().aug(other);
	};
	sub(other){
		return this.toLinSequence().sub(other);
	};
	mul(other){
		return this.toLinSequence().mul(other);
	};
	div(other){
		return this.toLinSequence().div(other);
	};
	pow(other){
		return this.toLinSequence().pow(other);
	};
	powBase(other){
		return this.toLinSequence().powBase(other);
	};
	
	
};

class ConSequence extends AbstractSequence{ // 상수 수열, 숫자 외에도 다양한 값을 넣을 수 있음
	constructor(key, n){
		super();
		this.key = key;
		this.n = n;
	};
	at(idx){
		return this.key;
	};
	get length(){
		return this.n;
	};
};

Number.prototype.conSequence = function(key){
	return new ConSequence(key, this);
};

class AbstractSpacedSequence extends AbstractSequence{ // 시점, 종점, 개수 그리고 시종점포함여부를 포함하는 공간형 수열, 기본적으로 시종점을 모두 포함한다.
	constructor(start, end, n, endpoint){
		super();
		this.start = start ?? 1;
		this.end = end ?? 100;
		this.n = Math.round(n ?? 100);
		if(this.n < 0) throw new RangeError('n<0 (n은 0이거나 양수)');
		this.endpoint = endpoint ?? '[]';
		if({'[]':-1, '(]':0, '[)':0, '()':+1}[this.endpoint] === undefined) throw new RangeError('잘못된 구간 기호');
		if(this.n == 1 && this.endpoint == '[]'){ // 강제조정, 0으로 나누기 방지용, n이 0이면 비어있으므로 상관없음
			this.endpoint = '[)'; // ex. new LinSequence(10,20,1,'[]') -> new LinSequence(10,20,1,'[)') :: [10]
		}
	};
	getAlpha(idx){
		return ((this.endpoint[0] == '(') + Number(idx))/this.nden;
	};
	inum(idx){
		return ((this.endpoint[0] == '(') + Number(idx));
	};
	get length(){
		return this.n;
	};
	get nden(){
		return this.n + {'[]':-1, '(]':0, '[)':0, '()':+1}[this.endpoint];
	};
	
};

class LinSequence extends AbstractSpacedSequence{ // 선형 수열
	constructor(start, end, n, endpoint){
		super(start, end, n, endpoint);
	};
	at(idx){
		return this.start.frAlphaAdd(this.end, this.inum(idx), this.nden).precise();
	};
	reverse(){
		return new LinSequence(this.end, this.start, this.n, {'[]':'[]','(]':'[)','[)':'(]','()':'()'}[this.endpoint]);
	};
	reverseCopy(){
		return new LinSequence(this.end, this.start, this.n, {'[]':'[]','(]':'[)','[)':'(]','()':'()'}[this.endpoint]);
	};
	
	// 계산 속도를 빠르게 하고 부정확한 값 방지를 위해 등차수열의 성질, 합의 공식에 따라 계산
	
	add(other){
		if(other === undefined){
			return this.at(0).center(this.at(this.n-1)) * this.n; // 등차수열의 합 공식 (매우 큰 숫자에 강점) 
		}
		if(other instanceof Numbers) other = other.toLinSequence();
		if(other instanceof LinSequence){ // LinSequence
			if(this.n != other.n) throw new SizeMismatchError(`${this.length} vs ${other.length} 크기가 다릅니다. `);
			if(this.endpoint == other.endpoint) // 끝점 구간이 동일하면 그냥 계산하면 됨
				return new LinSequence(this.start + other.start, this.end + other.end, this.n, this.endpoint);
			return new LinSequence(this.at(0) + other.at(0), this.at(this.n-1) + other.at(other.n-1), this.n, '[]'); // 강제로 끝점 조정하여 계산
		}
		if(other instanceof ConSequence){ // 상수수열
			return new LinSequence(this.start + other.key, this.end + other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){ // 스칼라
			return new LinSequence(this.start + other, this.end + other, this.n, this.endpoint);
		}
		return Array.prototype.add.call(this, other); // 그렇지 않을 시 일반 배열 수준 덧셈 실행
	};
	sub(other){
		if(other === undefined){ // 뺄샘하는 경우는 주의해야 함, 첫 항은 무조건 빼지는 수로 합에서 제외해야 함
			return this.at(0) - this.at(1).center(this.at(this.n-1)) * (this.n-1);
		};
		if(other instanceof Numbers) other = other.toLinSequence();
		if(other instanceof LinSequence){ // LinSequence
			if(this.n != other.n) throw new SizeMismatchError(`${this.length} vs ${other.length} 크기가 다릅니다. `);
			if(this.endpoint == other.endpoint) // 끝점 구간이 동일하면 그냥 계산하면 됨
				return new LinSequence(this.start - other.start, this.end - other.end, this.n, this.endpoint);
			return new LinSequence(this.at(0) - other.at(0), this.at(this.n-1) - other.at(other.n-1), this.n, '[]'); // 강제로 끝점 조정하여 계산
		}
		if(other instanceof ConSequence){ // 상수수열
			return new LinSequence(this.start - other.key, this.end - other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){ // 스칼라
			return new LinSequence(this.start - other, this.end - other, this.n, this.endpoint);
		}
		return Array.prototype.sub.call(this, other); // 그렇지 않을 시 일반 배열 수준 덧셈 실행
	};
	mul(other){
		if(other === undefined){
			return Array.prototype.mul.call(this); // 등차수열의 곱의 공식은 감마, 펙토리얼 등이 있긴 하지만... 
		}
		// 등차수열과 등차수열 또는 다른수열 곱해도 절대 등차수열은 불가능함. 다만 상수수열은 가능함
		if(other instanceof ConSequence){
			return new LinSequence(this.start * other.key, this.end * other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){ // 스칼라 곱도 유효함
			return new LinSequence(this.start * other, this.end * other, this.n, this.endpoint);
		}
		return Array.prototype.mul.call(this, other);
	};
	div(other){
		if(other === undefined){
			return Array.prototype.div.call(this); // 나눗셈도 마찬가지 
		}
		// 등차수열과 등차수열 또는 다른수열 나눠도 절대 등차수열은 불가능함. 다만 상수수열은 가능함
		if(other instanceof ConSequence){
			return new LinSequence(this.start / other.key, this.end / other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){ // 스칼라 나눗셈도 유효함
			return new LinSequence(this.start / other, this.end / other, this.n, this.endpoint);
		}
		return Array.prototype.div.call(this, other);
	}; // 숫자에서 등차수열로 나누는 행위는 조화수열으로 PowSequence로 계산 가능, 추후 예정
	pow(other){
		if(other === undefined){
			return Array.prototype.pow.call(this);
		}
		if(other instanceof ConSequence){ // 등차수열의 거듭제곱수열은 이미 구현되어 있음
			return new PowSequence(other.key, this.start ** other.key, this.end ** other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){
			return new PowSequence(other, this.start ** other, this.end ** other, this.n, this.endpoint);
		}
		
		return Array.prototype.pow.call(this, other);
	};
	powBase(other){
		if(other === undefined){
			return Array.prototype.powBase.call(this);
		}
		if(other instanceof ConSequence){ // 상수의 거듭제곱은 곧 등비수열
			return new ExpSequence(other.key ** this.start, other.key ** this.end, this.n, this.endpoint);
		}
		if(other.isNumber()){
			return new ExpSequence(other ** this.start, other ** this.end, this.n, this.endpoint);
		}
		
		return Array.prototype.powBase.call(this, other);
	};
	
};

LinSequence.prototype.aug = LinSequence.prototype.add; // add 별칭, aug :: Set에 add가 이미 있어 충돌방지를 위해 aug 사용 권장하나, 호환상 add도 있어야 함


Number.prototype.linSequence = function(start, end, endpoint){
	return new LinSequence(start, end, this, endpoint);
};

class PowSequence extends AbstractSpacedSequence{ // 거듭제곱 수열
	constructor(p, start, end, n, endpoint){
		super(start, end, n, endpoint);
		this.p = p ?? 2; // 기본 제곱으로 간주
	};
	get startr(){
		return this.start.root(this.p);
	};
	get endr(){
		return this.end.root(this.p);
	};
	at(idx){
		return (this.startr.frAlphaAdd(this.endr, this.inum(idx), this.nden) ** this.p).precise();
	};
	reverse(){
		return new PowSequence(this.p, this.end, this.start, this.n, {'[]':'[]','(]':'[)','[)':'(]','()':'()'}[this.endpoint]);
	};
	reverseCopy(){
		return new PowSequence(this.p, this.end, this.start, this.n, {'[]':'[]','(]':'[)','[)':'(]','()':'()'}[this.endpoint]);
	};
};

Number.prototype.powSequence = function(p, start, end, endpoint){
	return new PowSequence(p, start, end, this, endpoint);
};

class ExpSequence extends AbstractSpacedSequence{ // 지수 수열
	constructor(start, end, n, endpoint){
		super(start, end, n, endpoint);
	};
	get startl(){
		return Math.log(Math.abs(this.start));
	};
	get endl(){
		return Math.log(Math.abs(this.end));
	};
	at(idx){
		return Math.sign(this.start) * this.startl.frAlphaAdd(this.endl, this.inum(idx), this.nden).exp().precise();
	};
	reverse(){
		return new ExpSequence(this.end, this.start, this.n, {'[]':'[]','(]':'[)','[)':'(]','()':'()'}[this.endpoint]);
	};
	reverseCopy(){
		return new ExpSequence(this.end, this.start, this.n, {'[]':'[]','(]':'[)','[)':'(]','()':'()'}[this.endpoint]);
	};
	add(other){
		if(other === undefined){ // 등비수열의 합 공식
			if(this.end == this.start) return this.start * this.n; // 공비기 1인 경우
			
			if(this.n > 200){ // 부정확하다는 이유로 200개 초과 시 공식 사용
				let R = this.at(this.n) / this.at(0);
				let r = this.at(1) / this.at(0);
				
				return (this.at(0) * (1 - R) / (1 - r)).precise(); // 등비수열의 합 공식 (매우 큰 숫자에 강점)
			}			
		}
		return Array.prototype.add.call(this, other); // 그렇지 않을 시 일반 배열 수준 덧셈 실행
	};
	sub(other){
		if(other === undefined){ // 등비수열의 합 공식
			if(this.end == this.start) return this.start * (2 - this.n); // 공비기 1인 경우
			
			if(this.n > 200){
				let R = this.at(this.n-1) / this.at(0);
				let r = this.at(1) / this.at(0);
				
				return (this.at(0) - this.at(1) * (1 - R) / (1 - r)).precise(); // 등비수열의 합 공식 (매우 큰 숫자에 강점) 
			}
		}
		return Array.prototype.sub.call(this, other); // 그렇지 않을 시 일반 배열 수준 덧셈 실행
	};
	mul(other){
		if(other === undefined){
			return (this.start < 0 && this.n % 2 == 1 ? -1 : 1) * (this.at(0) * this.at(this.n-1)) ** (this.n/2); // 등비수열의 곱 공식 (매우 큰 숫자에 강점) 
		}
		if(other instanceof ExpSequence){ // ExpSequence
			if(this.n != other.n) throw new SizeMismatchError(`${this.length} vs ${other.length} 크기가 다릅니다. `);
			if(this.endpoint == other.endpoint) // 끝점 구간이 동일하면 그냥 계산하면 됨
				return new ExpSequence(this.start * other.start, this.end * other.end, this.n, this.endpoint);
			return new ExpSequence(this.at(0) * other.at(0), this.at(this.n-1) * other.at(other.n-1), this.n, '[]'); // 강제로 끝점 조정하여 계산
		}
		if(other instanceof ConSequence){ // 상수수열
			return new ExpSequence(this.start * other.key, this.end * other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){ // 스칼라
			return new ExpSequence(this.start * other, this.end * other, this.n, this.endpoint);
		}
		return Array.prototype.mul.call(this, other); // 그렇지 않을 시 일반 배열 수준 덧셈 실행
	};
	div(other){
		if(other === undefined){
			return (this.start < 0 && this.n % 2 == 0 ? -1 : 1) * this.at(0) / ((this.at(1) * this.at(this.n-1)) ** ((this.n - 1)/2)); // 등비수열의 곱 공식 (매우 큰 숫자에 강점) 
		}
		if(other instanceof ExpSequence){ // ExpSequence
			if(this.n != other.n) throw new SizeMismatchError(`${this.length} vs ${other.length} 크기가 다릅니다. `);
			if(this.endpoint == other.endpoint) // 끝점 구간이 동일하면 그냥 계산하면 됨
				return new ExpSequence(this.start / other.start, this.end / other.end, this.n, this.endpoint);
			return new ExpSequence(this.at(0) / other.at(0), this.at(this.n-1) / other.at(other.n-1), this.n, '[]'); // 강제로 끝점 조정하여 계산
		}
		if(other instanceof ConSequence){ // 상수수열
			return new ExpSequence(this.start / other.key, this.end / other.key, this.n, this.endpoint);
		}
		if(other.isNumber()){ // 스칼라
			return new ExpSequence(this.start / other, this.end / other, this.n, this.endpoint);
		}
		return Array.prototype.div.call(this, other); // 그렇지 않을 시 일반 배열 수준 덧셈 실행
	};
	
	
};

PowSequence.prototype.aug = PowSequence.prototype.add;

Number.prototype.expSequence = function(start, end, endpoint){
	return new ExpSequence(start, end, this, endpoint);
};


Number.prototype.for = function(fn, dropHead){
	for(let i=dropHead??0;i<this;i++){
		fn(i);
	}
};

Number.prototype.forDown = function(fn, dropHead){
	for(let i=this-1-(dropHead??0);i>=0;i--){
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
Object.identities = 
Number.identities = {
	'aug': 0,
	'add': 0,
	'sub': NaN,
	'mul': 1,
	'div': NaN,
	// 사칙 연산
	'padd': 0,
	'psub': NaN,
	'pmul': 1,
	'pdiv': NaN,
	// 정밀 보정 사칙 연산
	'divLim0': NaN,
	'divLim1': NaN,
	'divLimInf': NaN,
	// 
	'idiv': NaN,
	'mod': NaN,
	'dm': [1, NaN],
	'pow': NaN,
	'powLim0': NaN,
	'powLim1': NaN,
	'logBase': NaN,
	'bitwiseAnd': -1,
	'bitwiseOr': 0,
	'bitwiseXor': 0,
	'bitwiseLsh': NaN,
	'bitwiseRsh': NaN,
	'bitwiseUrsh': NaN,
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
	'ssub': 'N/A',
	'smul': 'N/A',
	'sdiv': ['N/A'],
	'pack2': NA,
	'toXY': [NaN, NaN],
	'toPolar': [NaN, NaN],
	'and': true,
	'or': false,
	'xor': false,
	'less': true, // 비교 연산자들은 and를 사용하기 때문에 and 항등원인 true 적용, 다만 CI는 애매해서 NaN 적용
	'leq': true,
	'greater': true,
	'geq': true,
	'equal': true,
	'notEqual': true,
};

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

String.prototype.reverse = function () {
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

String.prototype.toStringEx = function(){return "'"+this+"'"};


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
	return this.map(x=>x.isGeneralArray()?x.superCopy():x.isTypedArray()?x.copy():x);
};

Array.prototype.paste = function(other){ // 내 배열로 붙여넣기
	let that = this;
	this.length = other.length;
	this.length.for(function(i){
		that[i] = other[i].isGeneralArray() ? other[i].superCopy() : other[i].isTypedArray()?other[i].copy():other[i]; // 수열은 상수이기 때문
	});
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
	if(what.isGeneralArray()) return what.map(x=>that.lookup(x));
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
	if(what.isGeneralArray()){
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

Array.prototype.toArray = function(){return this;};

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
	let mincol = Math.min(...this.map(x=>x.isGeneralArray()?x.length:that.length));
	
	return new Array(mincol).fill(0).map((x,i)=>that.map(y=>y.isGeneralArray()?y[i]:y));
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
	if(other.isGeneralArray())
		this.push(...other);
	else
		this.push(other);
	return this;
};

Array.prototype.aaddLeft = Array.prototype.concat; // [10,20] a+ [30,5] = [10,20,30,5]
Array.prototype.aaddLeftApply = function(other){
	if(other.isGeneralArray())
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
	if(!other.isGeneralArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	let rows = eqTable.inner.or();
	//let cols = eqTable.or();
	
	return this.mask(rows.not());
};

Array.prototype.intersection = 
Array.prototype.aand = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isGeneralArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	let rows = eqTable.inner.or();
	//let cols = eqTable.or();
	
	return this.mask(rows);
};

Array.prototype.union = 
Array.prototype.aor = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isGeneralArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	//let rows = eqTable.inner.or();
	let cols = eqTable.or();
	
	return this.aadd(other.mask(cols.not()));
};

Array.prototype.symmetricDifference = 
Array.prototype.axor = function(other, equalOp){
	equalOp ??= 'equal';
	equalOp += 'Object';
	if(!other.isGeneralArray()) other = [other];
	let eqTable = this.matrix(equalOp, other);
	let rows = eqTable.inner.or();
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
	return this.sub(this.mean()).sumprod(other.sub(other.mean())).div(this.N());
};





/*

if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	if(other.isGeneralArray()){
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
	
	if(logical.isGeneralArray()){
		if(this.length != logical.length && this.length != 1 && logical.length != 1){
			// Broadcasting 불가 조건 
			return Array.NaA;
		}
		let tlen = this.length, llen = logical.length, len = tlen.greatest(llen);
		len.for(function(i){
			if(that.at(i % tlen).isGeneralArray()){
				if(logical.at(i % llen).isGeneralArray()) // 둘 다 배열이면 추가하되 재귀한 결과를 삽입
					result.push(that.at(i % tlen).mask(logical.at(i % llen)));
				// 논리값이 스칼라이면 그 여부에 따라 추가 (통째 처리)
				else if(logical.at(i % llen).boolean())
					result.push(that.at(i % tlen));
			}else if(logical.at(i % llen).isGeneralArray()){ // 원본 값이 스칼라면 괄호를 씌워 생각
				result.push([that.at(i % tlen)].mask(logical.at(i % llen)));
			}else if(logical.at(i % llen).boolean()){ // 모두 스칼라
				result.push(that.at(i % tlen));
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
	return this.reduce((x,y)=>y.isGeneralArray()?x+y.superCount():x+1,0);
};

Array.prototype.isExistNA = function(){
	return this.some(x=>x===undefined||x.isNA());
};
Array.prototype.naCount = function(){
	return this.filter(x=>x===undefined||x.isNA()).length;
};
Array.prototype.validCount = function(){ // 유효한 개수
	return this.filter(x=>x!==undefined&&!x.isNA()).length;
};
Array.prototype.checkValidElement = function(){ // 2차원 이상인 경우 사용, [[1,4],[2,8],[NA,7],6] 의 경우 [3,4] 가 적용됨 [1,2,NA,6]=>3, [[1],[2],[NA],[6]]=>[3]
	return this.map(x=>x.isGeneralArray()?x.checkValidElement():!x.isNA());
}; // [[1,4],[2,8],[NA,7],6].checkValidElement() = [[true,true],[true,true],[false,true],true]
Array.prototype.N = function(){ // 평균 등의 계산을 위해서 각 가지별로 개수를 구함, Broadcasting Rule 규정 적용
	return this.checkValidElement().sum();
};
//[[1,1],[1,1],[0,1],1].addReduce();
Array.prototype.naRate = function(){
	return this.filter(x=>x===undefined||x.isNA()).length / this.length;
};
Array.prototype.dropNA = function(){
	return this.filter(x=>x!==undefined && !x.isNA());
};
Array.prototype.dropNAApply = function(){
	return this.paste(this.dropNA());
};
Array.prototype.dropEmpty = function(){
	return this.filter(x=>x!==undefined && !x.isNA() && (!x.isArray() || x.length));
};
Array.prototype.dropEmptyApply = function(){
	return this.paste(this.dropEmpty());
};
Array.prototype.fillNA = function(k){
	if(typeof k == 'function')
		return this.map((x,i,A)=>x===undefined||x.isNA()?k(i,A):x);
	return this.map(x=>x===undefined||x.isNA()?k:x);
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

Array.prototype.unary = function(operator, isSafe){
	if(this.NaA) return Array.NaA;
	
	if(isSafe) 
		return this.map(a=>Gfunc.safeCall(a, operator));
	return this.map(a=>Gfunc.call(a, operator));
};

Array.prototype.unaryAp = function(operator){
	if(this.NaA) return this;
	let that = this;
	try{
		this.forEach((a,i,A)=>{
			try{
				that[i]=a[operator+(a.isGeneralArray()?'Apply':'')]()
			}catch(e){
				that[i]=e;
			}
		});
	}catch(e){return e;}
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
			return this.at(0);
		}
		case 2: return isRight ? this.at(1)[operator](this.at(0)) : this.at(0)[operator](this.at(1));
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
			if(isRight) return this.reduceRight((a,b,i,A)=>(i==A.length-2?true:a).and(A.at(i+1)[operator](b)));
			return this.reduce((a,b,i,A)=>(i==1?true:a).and(A.at(i-1)[operator](b)));
			
			case 'compare':
			if(isRight) return this.reduceRight((a,b,i,A)=>(i==A.length-2?1.5:a)._citrans(A.at(i+1)[operator](b)));
			return this.reduce((a,b,i,A)=>(i==1?1.5:a)._citrans(A.at(i-1)[operator](b)));
			
			default:
			return this[isRight?'reduceRight':'reduce']((a,b)=>a[operator](b));
		}
		
	}
}

Array.prototype.binary = function(operator, other){
	
	if(other === undefined){ // 지정하지 않은 경우 리듀싱으로 계산함
		return Array.prototype.opReduce.call(this,operator, false);
	}
	
	if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	
	if(other.isArray()){
		if(this.length != other.length){
			// 어느 한 쪽 길이가 1이면, Broadcasting
			if(this.length == 1) return other.map((a,i)=>that.at(0)[operator](a)); //Broadcasting 
			if(other.length == 1) return this.map((a,i)=>a[operator](other.at(0))); //Broadcasting 
			// 아니면 에러 처리함
			throw new SizeMismatchError(this.length+' vs '+other.length+' (크기가 맞지 않습니다. 단, 1개는 예외적으로 브로드캐스팅 룰에 따라 허용됩니다.)');
		}
		return this.map((a,i)=>a[operator](other.at(i)));
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

Array.prototype.binaryCar = function(operator, other){
	if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	
	if(other.isGeneralArray()){
		let res = new Array(this.length * other.length);
		this.forEach((a,i)=>other.forEach((b,j)=> res[i*other.length+j] = this[i][operator+(a.isGeneralArray()?'Cartesian':'')](other[j])));
		return res;
	}
	return this.map(a=>a[operator+(a.isGeneralArray()?'Cartesian':'')](other));
};

Array.prototype.binaryLeftCar = function(operator, other){
	if(this.NaA) return Array.NaA;
	if(other.NaA) return Array.NaA;
	
	let that = this;
	
	if(other.isGeneralArray()){
		let res = new Array(this.length * other.length);
		other.forEach((a,i)=>this.forEach((b,j)=> res[i*this.length+j] = this[j][operator+(a.isGeneralArray()?'LeftCartesian':'')](other[i])));
		return res;
	}
	return this.map(a=>a[operator+(a.isGeneralArray()?'LeftCartesian':'')](other));
};


/*
a = [[3,[9]], [4,5],[7,9], 11];
a.addApply([3,1,4,-2]);          // [[6,[12]],[5,6],[11,13],9]
a.addApply([3,[1,2],4,[-2,-3]]); // [[9,[15]],[6,8],[15,17],[7,6]]

a.toStringEx();
*/

Array.prototype.binaryAp = function(operator, other){ // 복합대입 (addApply 등)
	if(this.NaA) return this;
	if(other.NaA) return this;
	
	
	let that = this;
	if(other.isGeneralArray()){
		if(this.length != other.length){
			// 어느 한 쪽 길이가 1이면, Broadcasting
			if(this.length == 1){
				this[0] = other.map((a,i,A)=>that[0][operator+'Apply'](a)); //Broadcasting 
				return this;
			}
			if(other.length == 1){
				this.forEach((a,i,A)=>that[i]=a[operator+(a.isGeneralArray()?'Apply':'')](other[0])); //Broadcasting 
				return this;
			}
			// 아니면 NaA 반환
			this.NaA = true; // NaA 처리하고
			this.length = 0; // 전부 삭제
			return this;
		}
		this.forEach((a,i,A)=>that[i]=a[operator+(a.isGeneralArray()?'Apply':'')](other[i]));
		return this;
	}
	this.forEach((a,i,A)=>that[i]=a[operator+(a.isGeneralArray()?'Apply':'')](other));
	return this;
};

Array.prototype.ternary = function(operator, other, ...args){ // 3항 이상은 2항까지 배열 허용
	
	if(this.NaA) return Array.NaA;
	
	if(other!==undefined){
		
		if(other.NaA) return Array.NaA;
		
		let that = this;
		if(other.isGeneralArray()){
			if(this.length != other.length){
				// 어느 한 쪽 길이가 1이면, Broadcasting
				if(this.length == 1) return other.map((a,i)=>that[0][operator](a, ...args)); //Broadcasting 
				if(other.length == 1) return this.map((a,i)=>a[operator](other[0], ...args)); //Broadcasting 
				// 아니면 에러 처리함
				throw new SizeMismatchError(this.length+' vs '+other.length+' (only allow 1vsN, Nvs1, NvsN), Evaluate All Cases : '+operator+'Cartesian(y) etc.');
			}
			return this.map((a,i)=>a[operator](other[i], ...args));
		}
	}
	return this.map(a=>a[operator](other, ...args));
	
};

Array.prototype.ternaryAp = function(operator, ...args){
	if(this.NaA) return this;
	
	this.forEach((a,i,A)=>A[i]=a[operator+(a.isGeneralArray()?'Apply':'')](...args));
	return this;
};

AbstractSequence.prototype.unary = Array.prototype.unary;
AbstractSequence.prototype.binary = Array.prototype.binary;
AbstractSequence.prototype.ternary = Array.prototype.ternary;


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
//  *** 수정 필요 구간 ***
	/*
	Array.prototype.someE = function(operator){
		let res = this[operator]();
		return res.NaA ? false : res.someBoolean();
	};
	Array.prototype.oevery = function(operator){
		let res = this[operator]();
		return res.NaA ? false : res.everyBoolean();
	};
	Array.prototype.orate = function(){
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

*/

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
	return indices_array.map(x=>x.isGeneralArray()?that._singleIndexing(x):that[x]);
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

Array.prototype.setAt = function(idx, value){
	return this[idx] = value;
};

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
	
	if(depth.isGeneralArray()){ // .pick([~]) -> .pick(0, [~])
		indices = [depth, ...indices];
		depth = 0;
	}
	
	if(depth >= 1)
		return this.map(x=>x.isGeneralArray()?x.pick(depth-1, ...indices));
	
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
 두 배열간의 요소간 연산은 innerBinary 을 사용 (예정)
 앞에 @를 붙일 시 해당 속성 반환
 
 [예제]
 a = [[10,20,25],[37,60,28]];
 a.inner(0, x=>x+3).toStringEx(); // '10,20,25,37,60,283'
 a.inner(1, x=>x+3).toStringEx(); // ['10,20,253','37,60,283']
 a.inner(2, x=>x+3).toStringEx(); // [[13,23,28],[40,63,31]]
 a.inner(3, x=>x+3).toStringEx(); // [[[13],[23],[28]],[[40],[63],[31]]]
 a.inner(2, 'toString', 16).toStringEx(); // [['a','14','19'],['25','3c','1c']]
 a.inner(2, 'combined', ['toString:', 16], 'toUpperCase').toStringEx(); // [['A','14','19'],['25','3C','1C']]
 
 
*/

Array.prototype._inner = function(depth, operator, ...params){
	depth ??= 1;
	
	if(depth >= 2)
		return this.map(a=>(a.isArray()?a:[a])._inner(depth-1, operator, ...params));
	
	if(depth >= 1){
		return this.map(a=>Gfunc.call(a, operator, ...params));
	}
	
	/*
	if(depth >= 1)
		return this.map(a=>Gfunc.call(a, operator, ...params));
	*/
	
	if(params.length == 0) // Unary Operator
		return this.isArray() ? Gfunc.call(this, operator, ...params) : this;
	
	// Binary or Over Binary
	return Gfunc.call(this, operator, ...params);
};


/*

inner와 broadcast

inner(d)  : 단순 해당 함수 내부 1회성 실행, d를 붙여 깊이 지정후 함수로 표현
broadcast : .result 전까지 계속 브로드캐스팅

예 :
a = [[10,20,30],[40,50,60,80],[62,75,83,12],[80,90,100]];
a.inner.add() = [60,230,232,270]
a.broadcast.add() = #[60,230,232,270]             << 현재 브로드캐스팅 중임을 표시
a.broadcast.add().result = [60,230,232,270]       << 브로드캐스팅 중단
a.broadcast.add().result.mul() = 864432000        << 브로드캐스팅 후의 뒷처리

broadcast의 경우는 속성을 처리하므로 $aaa() 를 쓰지 않음
inner의 경우는 함수 기반으로 $aaa() 사용 

아래는 모두 동일한 결과를 반환함

a = [[10,20,30],[40,50,60,80],[62,75,83,12],[80,90,100]];
a.right(2).broadcast.mid(1,-1).value.result.toStringEx(); // 시점(broadcast)과 종점(result) 를 명시
a.right(2).inner.mid(1,-1).inner.$value().toStringEx();   // 계속해서 inner를 써야 함

TypedArray 는 broadcast 미지원 (1차원이므로)
TypedTensor는 broadcast 대신에 axis를 사용

이중 이상의 브로드캐스팅... 일괄 종료는 result 1번만 사용

a = [[[2, 1, 6],
      [0, 5, 5],
      [8, 3, 0]],

     [[8, 2, 1],
      [1, 6, 9],
      [6, 0, 8]],

     [[4, 8, 8],
      [7, 5, 8],
      [0, 0, 9]]];


a.broadcast.broadcast.mean().result                      // 2차 내부의 평균 계산
a.broadcast.broadcast.max().resd1.min().result = [6,5,8] // 2차 내부의 최댓값 계산 후 1차 내부의 최솟값 계산

resd2  -> 2차 내부 방송 종료
resd1  -> 1차 내부 방송 종료
resd0  ->     외부 방송 종료
result ->     전체 방송 종료

a.left(2).value.broadcast.right(2).value.broadcast.mid(1,-1).value.result.toStringEx();
[[[5],[3]],[[6],[0]]]

*/

function stopBroadcastInner(r){
	return r.map(x=>x.onair ? x.result : x);
}

let ArrayBroadcastHandler = {
	get:function(broadcaster, key){
		if(key == 'onair') return true;
		// 중첩 방송 처리
		if(key == 'result') return broadcaster.target.map(x=>x.onair ? x.result : x); // 전체 방송 종료
		// 내부 방송 종료
		if(key == 'resd0') return broadcaster.target;
		if(key.startsWith('resd') && !isNaN(key.slice(4))){
			return new Proxy({target:broadcaster.target.map(x=>x.onair ? x['resd'+(key.slice(4)-1)] : x), onair:true}, ArrayBroadcastHandler);
		}
		if(key == 'toStringEx') return ()=>'#'+broadcaster.target.toStringEx();
		
		// 함수는 각 함수로 실행, 첫 번째 인자 가지고 판단
		if(broadcaster.target.length && typeof broadcaster.target[0][key] == 'function'){
			return function(...args){
				return new Proxy({target:broadcaster.target.map(x=>x[key](...args)), onair:true}, ArrayBroadcastHandler);
			};
		}
		// 속성은 각 속성으로 실행
		return new Proxy({target:broadcaster.target.map(x=>x[key]), onair:true}, ArrayBroadcastHandler);
		
	},
	set:function(broadcaster, key, value){ // 값 설정은 더 이상의 방송이 필요 없다
		broadcaster.target.forEach((x,i)=>broadcaster.target[i][key] = value);
		return true;
	},
	/*
	get : function (target, operator){
		//if(operator == 'value') return target.object.value;
		
		return function(...args){
			return target.object.map(x=>x[operator](...args));
		};
		//return target.object.map(x=>x[operator](...args));
	}
	*/
};


Array.prototype.__defineGetter__('broadcast', function(){
	return new Proxy({target:this, onair:true}, ArrayBroadcastHandler);
});

let SimpleArrayBroadcastHandler = {
	get:function(broadcaster, key){
		return function(...args){
			return broadcaster.target._inner(broadcaster.depth, key, ...args);
		};
	},
	set:function(broadcaster, key, value){
		return true;
	},
};

Array.prototype.innerd = function(depth){
	return new Proxy({target:this, depth:depth}, SimpleArrayBroadcastHandler);
};

Array.prototype.__defineGetter__('inner', function(){
	return new Proxy({target:this, depth:1}, SimpleArrayBroadcastHandler);
});


/*
if(this.length == 0) return Number.identities[operator];
		if(this[0].isGeneralArray())
			return this.slice(1)[isRight?'reduceRight':'reduce']((a,b)=>b.isGeneralArray()?
				a[operator](b[superOperator](isRight)) : a[operator](b), this[0][superOperator](isRight));
		return this[isRight?'reduceRight':'reduce']((a,b)=>b.isGeneralArray()?
			a[operator](b[superOperator](isRight)) : a[operator](b));
*/
//[50,[30,[20, 10]],70].superReduce('mean') = [50,[30,15],70] -> [50,22.5,70] -> 47.5
Array.prototype.superReduce = function(operator, isRight){
	return this.map(x=>x.isGeneralArray() ? x.superReduce(operator,isRight) : x)[operator+(isRight?'RTL':'')](); // 해당 함수에 이미 항등원 처리 반영
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
	
	if(size == 2 && Object.operations[operator].length == 2){
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
	let cum = this.at(isRight ? this.length-1 : 0);
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



// [덧셈-]곱셈-거듭제곱 함수

Array.prototype.mulPow = function(){
	return this.reduce((a,b)=>b.isGeneralArray()?a.mul(b.superReduce('pow')):a.mul(b));
	//return this.reduce((a,b)=>b.isGeneralArray()?(b.opTag=='div'?a.div(b.powSuperReduce()):a.mul(b.powSuperReduce())):a.mul(b));
};

Array.prototype.addMulPow = function(){
	return this.reduce((a,b)=>b.isGeneralArray()?a.add(b.mulPow()):a.add(b));
};

/*

배열 분류
[1,4,3,5,7,3.5].classify({'0':x=>x.isEven(), '1':x=>x.isOdd()}, 2);
	= {'0':[4], '1':[1,3,5,7], '2':[3.5]}
*/

/*
Array.prototype.classify = function(classifier, otherwise){
	let classified = {};
	
	for(let key in classifier){
		classified[key] = [];
	};
	
	this.forEach(val=>{
		let found = false;
		for(let key in classifier){
			classified[key].push(val);
			found = true;
			break;
		}
		if(!found && otherwise) classified[otherwise] = val;
	});
	
	return classified;
};
*/

////////////////
// 배열연산자 //
////////////////
// 집계메소드 //
////////////////

Array.prototype.sum = function(){ // sum은 addReduce와는 달리 NA를 무시함
	if(!this.isValidArray()) return Array.NaA;
	let dna = this.dropNA(); // NA제거
	if(!dna.length) return 0; // 합계의 특징상 하나라도 없으면 에러 대신에 0을 반환해야 함
	return dna.add();
};

/*
Array.prototype.sum.usePointer = function(pointer){
	
};
*/

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
	return this.sum().div(this.N());
};

// 멱평균 (1=산술, 0=기하, -1=조화)
Array.prototype.powerMean = function(p){ // Infinity, 0이 아닌 너무 크거나 작은 값 등은 계산오류가 발생함
	p ??= 0; // 기하평균
	if(p.isFinite())
		return p ? this.pow(p).sum().div(this.N()).pow(1/p) : 
			this.log().sum().div(this.N()).exp();
	return p > 0 ? this.abs().max() : this.abs().min(); // 무한대 값을 준 경우
}; // 하이퍼 파라미터 문제 있음

Array.prototype.var = function(){ // [100,50,70,[80,90,NA]].stdev()
	let dna = this.dropNA();
	let s = dna.mean();
	
	return dna.reduce((a,b)=>a.add(b.sqSub(s)),0).div(this.N());
	//return (this.reduce((a,b)=>a+(b-s)*(b-s),0) / dna.length) ** 0.5;
};

Array.prototype.stdev = function(){ // [100,50,70,[80,90,NA]].stdev()
	let dna = this.dropNA();
	let s = dna.mean();
	
	return dna.reduce((a,b)=>a.add(b.sqSub(s)),0).div(this.N()).sqrt();
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


// 배열 전체 비교 (길이도 체크함)


Array.prototype.naValueObject = function(v){return this;}; // 객체 자체 NA값 처리이므로, 배열 각 내부는 naValue 사용

Array.prototype.similarObject = function(other){ // 배열이 같은지 비교, '0' 과 0 정도만 허용하고 모양이 다르면 바로 false 처리함
	return this == other || other.isGeneralArray() && this.length == other.length && this.every((a,i)=>a.similarObject(other[i]));
};

Array.prototype.notSimilarObject = function(other){
	return !this.similarObject(other);
};

Array.prototype.equalObject = function(other){ // 배열이 같은지 비교, '0' 과 0 정도만 허용하고 모양이 다르면 바로 false 처리함
	return other.isGeneralArray() && this.length == other.length && this.every((a,i)=>a.equalObject(other[i]));
};

Array.prototype.notEqualObject = function(other){
	return !this.equalObject(other);
};

Array.prototype.identicalObject = function(other){
	return other.isGeneralArray() && this.length == other.length && this.every((a,i)=>a.identicalObject(other[i]));
};

Array.prototype.notIdenticalObject = function(other){
	return !this.identicalObject(other);
};

Array.prototype._EachObject = function(what, other){
	what += 'Object';
	if(this.NaA) return Array.NaA;
	if(other.isGeneralArray()){
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
/*

for(let aop of ARRAY_UNARY_OPERATORS){ // 단항 배열 연산자
	let innerAop = aop.addCamelPrefix('inner');
	Array.prototype[innerAop] = function(depth){
		depth ??= 1;
		if(depth >= 2)
			return this.map((x,i)=>(x.isGeneralArray()?x:[x])[innerAop](depth-1));
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
			return this.map((x,i)=>(x.isGeneralArray()?x:[x])[innerAop](depth-1, other));
		if(depth >= 1){
			if(other.isGeneralArray()){
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
			return this.map((x,i)=>(x.isGeneralArray()?x:[x])[innerAop](depth-1, ...args));
		if(depth >= 1){
			return this.map((x,i)=>x[aop](...args)); // Broadcasting
		}
		return this[aop](...args);
	};
}

*/


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
	return this.map(a=>a.isGeneralArray() ? a.funcall(x, ...args) : a[x](...args));
};
// 위의 3개 삭제 예정, unary 등으로 대체

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
	if(this.every(x=>!x.isGeneralArray())) return this;
	return this.flat().superFlat();
};

// 현재 flatted 배열 및 shape = [0, 6, [2, 3, [4, 5]], 1, []] 이렇게 인덱스 지정 필수
// [10, 30, 'a', 'b', false, NA, -3.8].reshape([0, 6, [2, 3, [5, 4]], 1, []])
// [10,-3.8,['a','b',[N/A,false]],30,[]]
Array.prototype.reshape = function(shape){
	// 두 배열 모두 배열이 아니거나 유효한 배열이 아닌 경우 NaA 반환
	// 단, 현재 배열은 유효성은 모르나 일단 배열임
	if(!this.isValidArray() || !shape.isGeneralArray() || !shape.isValidArray()) return Array.NaA;
	let that = this;
	return shape.map(x=>x.isGeneralArray()?that.reshape(x):nullToNA(that[x]));
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




// 실제 값 접근, 일반 Array는 기존 적용

/*

ArrayPointer : 배열 접근 도우미
============

Array에는 a[0], a[1] 등 일반 접근도 존재하지만
a.val 을 사용한다면 a.val[-1] 등 끝 값도 접근할 수 있음 (Python과 동일)
a.values 를 통해서 현재 배열 객체에 집어넣을 수도 있으며
배열 객체가 아닌 경우 fill을 통해서 전체 값을 채워 넣을 수도 있음

- a.val[i]                      : 단일 값 접근 -> a[i]로 변경 예정
- a.left(N).value            : 첫 N개 값 접근
- a.right(N).value           : 뒤 N개 값 접근
- a.mid(M,N).value           : M부터 N까지 구간 값 접근
- a.all.value                : 전체 접근
- a.pickptr(indices).value      : 특정 첨자 접근 (추후 예정)
- a.maskptr(booleanArray).value : 불리언 마스킹


<<단일 접근>>

a = [1,4,2,8,5,7,3,6,9];
a.val[3];  // 8
a.val[-2]; // 6
a.val[5] = 10; a; // [1,4,2,8,5,10,3,6,9]

a[3] 등을 통해서 가능하나, 원시값(raw) 접근이므로
ScaledArray에서는 환산되기 전의 값을 취급하므로 .val로 하는 것을 권장함

<<슬라이싱 및 필링>>

a = [1,4,2,8,5,7,3,6,9];

a.mid(2,-2).value;             // Slicing Get // [2,8,5,7,3] == a.slice(2,-2)
a.mid(2,-2).value = [1, 7]; a; // Slicing Set // [1,4,1,7,6,9] Python의 a[2:5] = [1, 7] 와 동일
a.mid(2,-2).value = 10; a;     // Filling     // [1,4,10,10,10,10,10,6,9] 
a.mid(2,-2).value = []; a;     // Drop        // [1,4,6,9]

// TypedArray 모두 적용 가능하지만, Slicing Set 적용 시 길이 불일치 시 RangeError 발생

<<리버싱 및 스텝 포인터>>

a = [1,4,2,8,5,7,3,6,9];
a.rev.value               // [9,6,3,7,5,8,2,4,1];
a.step(2).value           // [1,2,5,3,9]
a.step(-2).value          // [9,3,5,2,1]
a.mid(2,-2,-1).value      // [3,7,5,8,2]
a.mid(2,-2,2).value       // [2,5,3]
a.mid(2,-2,-3).value      // [3,8]



*/

Array.prototype.__defineGetter__('value', function(){
	return this;
});

Array.prototype.__defineSetter__('value', function(arr){
	if(arr.isArray())
		this.paste(arr);
	else
		this.fill(arr);
});

/*
const ArrayPartialRun = {
	get: function(target, fn){
		return 
	},
};
*/

// 숫자 첨자를 계산하기 위한 조치, .val 떼기
// 진짜 배열로 위장을 했기 때문에 이제 every some 등 Primitive Method 사용 가능

class APIndexing{
	constructor(){
		return this.proxy = new Proxy(this, {
			get: (object, key) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					return object.at(key);
				}
				if(Reflect.has(object, key))
					return Reflect.get(object, key);
				return Reflect.get(object.target, key);
			},
			set: (object, key, value) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					object.setAt(key, value);
					return true;
				}
				Reflect.set(object, key, value);
				return true;
			},
			has: (object, key) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					return true;
				}
				if(Reflect.has(object, key))
					return Reflect.has(object.target, key);
				return Reflect.has(object, key);
			},
		});
	}
};

class ArrayPointer extends APIndexing{
	constructor(target, start, end, reversed){
		super();
		
		this.target = target;
		this.start = (start ?? 0);
		this.end = (end ?? this.target.length);
		this.reversed = reversed ?? false;
		
		if(this.start == 0 && 1/this.start < 0) this.start = target.length; // -0
		else if(this.start < 0) this.start += target.length;
		
		if(this.end == 0 && 1/this.end < 0) this.end = target.length; // -0
		else if(this.end < 0) this.end += target.length;
		
		this.start = this.start.fitInRange(0, this.target.length, '[)');
		this.end = this.end.fitInRange(0, this.target.length, '[)');
		
		
	};
	get value(){
		return this.target.slice(this.start, this.end).optional(this.reversed, 'reverse');
	};
	set value(v){
		if(v.isArray()){ // 배열은 splice(대체) 적용
			if(this.reversed) v = v.reverseCopy(); // 거꾸로 처리하기에 원본 훼손 없이 역순 카피
			//if(v.num === undefined)
			this.target.splice(this.start, this.end-this.start, ...v); // ... 연산자 환산 완료
			//else // ScaledArray 같은 경우는 반드시 환산 적용해야 함, '...' 연산자는 환산을 무시함
				//this.target.splice(this.start, this.end-this.start, ...v.toFloat64Array());
		}else{ // 배열이 아니면 fill(채움) 적용, 채움은 어차피 똑같아서 거꾸로 안해도 됨
			this.target.fill(v, this.start, this.end);
		}
		return true;
	};
	valueOf(){
		return this.target.slice(this.start, this.end).optional(this.reversed, 'reverse');
	};
	toString(){
		return this.target.slice(this.start, this.end).optional(this.reversed, 'reverse').toString();
	};
	toStringEx(){
		return '*'+this.target.slice(this.start, this.end).optional(this.reversed, 'reverse').toStringEx();
	};
	// 불필요한 서브어레이 생성 없이 연산함
	// 모든 메소드 위장하기
	
	get length(){
		return Math.max(0,this.end - this.start);
	};
	
	_realIndex(idx){ // 포인터 상의 인덱스를 참조하는 배열 또는 포인터의 인덱스로 변환
		let len = this.length;
		if(idx < 0) idx += len;
		if(this.reversed) idx = len - 1 - idx; // 반전된 경우
		if(!idx.inRange(0, len, '[)')) throw new ArrayBoundaryError('범위 초과 | '+(idx));
		return idx + this.start;
	};
	at(idx){
		return this.target.at(this._realIndex(Number(idx)));
	};
	setAt(idx,val){
		this.target[this._realIndex(Number(idx))] = val;
		return this;
	};
	
	get val(){
		return new Proxy(this, {
			get: function(pointer, i){
				return pointer.at(+i);
			},
			set: function(pointer, i, v){		
				pointer.target[pointer._realIndex(+i)] = v;
				return true;
			},
		});
	};
	
	get broadcast(){
		return new Proxy({target:this.proxy, onair:true}, ArrayBroadcastHandler);
	};
	get inner(){
		return new Proxy({target:this.proxy, depth:1}, SimpleArrayBroadcastHandler);
	};
	[Symbol.iterator](){ // for of 문, ...문 사용 시에도 변조가 필요함
		let that = this;
		let i = -1;
		return{
			next: () => ({value: ++i < that.length ? that.at(i) : 0, done:!(i<that.length)})
		};
	};
	// reverseCopy는 저기(target)서 도와줌
	// 위장을 하기 위해 실제 배열로 위장
	isArray(){
		return true;
	};
	isGeneralArray(){
		return true;
	};
};

/*
Array.prototype.__defineGetter__('inner', function(){
		return new Proxy({object:this,depth:1}, handler);
	});
*/

Array.prototype.mid = function(a,b,reversed){
	return new ArrayPointer(this, a, b, reversed);
};

Array.prototype.left = function(a, reversed){
	return new ArrayPointer(this, 0, a, reversed);
};

Array.prototype.right = function(a, reversed){
	return new ArrayPointer(this, this.length-a, this.length, reversed)
};

Array.prototype.__defineGetter__('all', function(){
	return new ArrayPointer(this, 0, this.length, false);
});

Array.prototype.__defineGetter__('rev', function(){
	return new ArrayPointer(this, 0, this.length, true);
});







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
// 각 내부 요소에 toStringEx이 없는 메소드는 toString를 사용
Array.prototype.toStringEx = function(){
	if(this.NaA) return 'NaA';
	return '['+this.map(x=>x.toStringEx ? x.toStringEx() : x.toString())+']';
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
	}catch(e){console.warn(new ETW(e));return '#'+e.name+'#';}
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
Number.prototype.zero_fill = function(n){ // String.padStart, padEnd 가 생겨서 필요 없을 것이나 호환성 위해...
	switch(Math.sign(this)){
		case  1: return this.toString().empty_fill(0, n);
		case  0: return '0'.repeat(n);
		case -1: return '-'+(-this).toString().empty_fill(0, Math.max(0,n-1));
		default: return this.toString();
	}
};


// NaN은 == 연산자에서 잘못된 결과가 나오므로 NA로 변환하기를 권고함, 배열은 각 요소에서 처리함
Boolean.prototype.NaNtoNA = 
String.prototype.NaNtoNA = function(){ return this.valueOf();};
Number.prototype.NaNtoNA = function(){ return isNaN(this)?NA:this.valueOf();};

Boolean.prototype.NAtoNaN = 
String.prototype.NAtoNaN = 
Number.prototype.NAtoNaN = function(){ return this.valueOf();};



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
	return this.map(a=>a.truediv(sum).mul(k ?? 1));
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
TypedArray  : 1차원 배열 취급
TypedMatrix : 2차원 배열 취급
TypedTensor : 3차원 배열 취급
DataFrame   : Pandas와 유사

[Primitive]
Int8, Int16, Int32
Uint8, Uint16, Uint32
Float32, Float64
BigInt64, BigUint64

[Extended - 지원 예정]
Int24, Uint24 -> high : Uint8, Int8, low: Uint16 -> proxy 접근 방식

BIN(BigInt(정수)+Number(소수부)), Real(16byte), Fraction(8byte)

전 유형 일반 Array 거의 동일한 Array Spec 적용, Inner Spec은 Matrix에만 적용
String Spec 적용 제외, 성능 최적화 상으로

*/

// 단축 명칭

Array.nm = Array.prototype.nm = 'GA'; // General Array
Int8Array   .nm = Int8Array   .prototype.nm = 'I8A';
Int16Array  .nm = Int16Array  .prototype.nm = 'I16A';
Int32Array  .nm = Int32Array  .prototype.nm = 'I32A';
Uint8Array  .nm = Uint8Array  .prototype.nm = 'U8A';
Uint16Array .nm = Uint16Array .prototype.nm = 'U16A';
Uint32Array .nm = Uint32Array .prototype.nm = 'U32A';
Float32Array.nm = Float32Array.prototype.nm = 'F32A';
Float64Array.nm = Float64Array.prototype.nm = 'F64A';

Int8Array   .isIntArray = Int8Array   .prototype.isIntArray = true;
Int16Array  .isIntArray = Int16Array  .prototype.isIntArray = true;
Int32Array  .isIntArray = Int32Array  .prototype.isIntArray = true;
Uint8Array  .isIntArray = Uint8Array  .prototype.isIntArray = true;
Uint16Array .isIntArray = Uint16Array .prototype.isIntArray = true;
Uint32Array .isIntArray = Uint32Array .prototype.isIntArray = true;
Float32Array.isIntArray = Float32Array.prototype.isIntArray = false;
Float64Array.isIntArray = Float64Array.prototype.isIntArray = false;

Int8Array.RAW_MIN_VALUE = -0x80;
Int16Array.RAW_MIN_VALUE = -0x8000;
Int32Array.RAW_MIN_VALUE = -0x80000000;
Uint8Array.RAW_MIN_VALUE = 0;
Uint16Array.RAW_MIN_VALUE = 0;
Uint32Array.RAW_MIN_VALUE = 0;
Float32Array.RAW_MIN_VALUE = Number.MIN_VALUE;
Float64Array.RAW_MIN_VALUE = Number.MIN_VALUE;

Int8Array.RAW_MAX_VALUE = 0x7F;
Int16Array.RAW_MAX_VALUE = 0x7FFF;
Int32Array.RAW_MAX_VALUE = 0x7FFFFFFF;
Uint8Array.RAW_MAX_VALUE = 0xFF;
Uint16Array.RAW_MAX_VALUE = 0xFFFF;
Uint32Array.RAW_MAX_VALUE = 0xFFFFFFFF;
Float32Array.RAW_MAX_VALUE = Number.MAX_VALUE;
Float64Array.RAW_MAX_VALUE = Number.MAX_VALUE;

Int8Array.RAW_EPSILON = 1;
Int16Array.RAW_EPSILON = 1;
Int32Array.RAW_EPSILON = 1;
Uint8Array.RAW_EPSILON = 1;
Uint16Array.RAW_EPSILON = 1;
Uint32Array.RAW_EPSILON = 1;
Float32Array.RAW_EPSILON = 2**-23;
Float64Array.RAW_EPSILON = Number.EPSILON;


class TAPIndexing{
	constructor(){
		return this.proxy = new Proxy(this, {
			get: (object, key) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					return object.at(key);
				}
				if(Reflect.has(object, key))
					return Reflect.get(object, key);
				return Reflect.get(object.target, key);
			},
			set: (object, key, value) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					object.setAt(key, value);
					return true;
				}
				Reflect.set(object, key, value);
				return true;
			},
			has: (object, key) => {
				if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
					return true;
				}
				if(Reflect.has(object, key))
					return Reflect.has(object.target, key);
				return Reflect.has(object, key);
			},
		});
	}
};


class TypedArrayPointer extends TAPIndexing{
	constructor(target, start, end, reversed){
		super();
		
		this.target = target;
		this.start = (start ?? 0);
		this.end = (end ?? this.target.length);
		this.reversed = reversed ?? false;
		
		if(this.start == 0 && 1/this.start < 0) this.start = target.length; // -0
		else if(this.start < 0) this.start += target.length;
		
		if(this.end == 0 && 1/this.end < 0) this.end = target.length; // -0
		else if(this.end < 0) this.end += target.length;
		
		this.start = this.start.fitInRange(0, this.target.length, '[)');
		this.end = this.end.fitInRange(0, this.target.length, '[)');
		
		
	};
	get value(){
		return this.target.slice(this.start, this.end);
	};
	set value(v){
		if(v.isArray()){
			if(this.end - this.start != v.length)
				throw new RangeError('배열 개수 불일치 (단, 배열이 아닌 원소의 경우는 채워넣기 진행)');
			this.target.set(v.num === undefined ? v : v.toFloat64Array(), this.start);
		}else
			this.target.fill(v, this.start, this.end);
	};
	valueOf(){
		return this.target.slice(this.start, this.end).optional(this.reversed, 'reverse');
	};
	toString(){
		return this.target.slice(this.start, this.end).optional(this.reversed, 'reverse').toString();
	};
	toStringEx(){
		return '*'+this.target.slice(this.start, this.end).optional(this.reversed, 'reverse').toStringEx();
	};
	// 불필요한 서브어레이 생성 없이 연산함
	// 모든 메소드 위장하기
	
	get length(){
		return Math.max(0,this.end - this.start);
	};
	
	_realIndex(idx){ // 포인터 상의 인덱스를 참조하는 배열 또는 포인터의 인덱스로 변환
		let len = this.length;
		if(idx < 0) idx += len;
		if(this.reversed) idx = len - 1 - idx; // 반전된 경우
		if(!idx.inRange(0, len, '[)')) throw new ArrayBoundaryError('범위 초과 | '+(idx));
		return idx + this.start;
	};
	at(idx){
		return this.target.at(this._realIndex(Number(idx)));
	};
	setAt(idx,val){
		return this.target.setAt(this._realIndex(Number(idx)), val);
	};
	
	get val(){
		return new Proxy(this, {
			get: function(pointer, i){
				return pointer.at(+i);
			},
			set: function(pointer, i, v){		
				pointer.target[pointer._realIndex(+i)] = v;
				return true;
			},
		});
	};
	
	[Symbol.iterator](){ // for of 문, ...문 사용 시에도 변조가 필요함
		let that = this;
		let i = -1;
		return{
			next: () => ({value: ++i < that.length ? that.at(i) : 0, done:!(i<that.length)})
		};
	};
	// reverseCopy는 저기(target)서 도와줌
	// 위장을 하기 위해 실제 배열로 위장
	isArray(){
		return true;
	};
	isGeneralArray(){
		return true;
	};
};


/*
class TypedArrayPointer extends TAPIndexing{
	constructor(target, start, end){
		super();
		this.target = target;
		this.start = start;
		this.end = end;
		
		if(this.start == 0 && 1/this.start < 0) this.start = target.length; // -0
		else if(this.start < 0) this.start += target.length;
		
		if(this.end == 0 && 1/this.end < 0) this.end = target.length; // -0
		else if(this.end < 0) this.end += target.length;
		
	};
	at(idx){
		return this.target.at(this.start + idx);
	};
	get value(){
		return this.target.slice(this.start, this.end);
	};
	set value(v){
		if(v.isArray()){
			if(this.end - this.start != v.length)
				throw new RangeError('배열 개수 불일치 (단, 배열이 아닌 원소의 경우는 채워넣기 진행)');
			this.target.set(v.num === undefined ? v : v.toFloat64Array(), this.start);
		}else
			this.target.fill(v, this.start, this.end);
	};
	valueOf(){
		return this.target.slice(this.start, this.end);
	};
	toString(){
		return this.target.slice(this.start, this.end).toString();
	};
	toStringEx(){
		return '*'+this.target.slice(this.start, this.end).toStringEx();
	};
	isArray(){
		return true;
	};
	isTypedArray(){
		return true;
	};
};
*/


//Fixed16Array, Fixed32Array

// 타 데이터타입과 연산시의 형변환표, Array와 연산 시 모두 Array로 변환
// Numpy의 규정에서 약간 변형 (Int64, Uint64 제외)
// ScaledNArray는 자기 자신이여도 무조건 Float64Array로 변환, 단, Float32Array와 연산 시는 Float32Array 적용

const TYPE_BINARY_OP = {
	'I8A':  {'I8A':'I8A',  'I16A':'I16A', 'I32A':'I32A', 'U8A':'I16A', 'U16A':'I32A', 'U32A':'F64A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'I16A': {'I8A':'I16A', 'I16A':'I16A', 'I32A':'I32A', 'U8A':'I16A', 'U16A':'I32A', 'U32A':'F64A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'I32A': {'I8A':'I32A', 'I16A':'I32A', 'I32A':'I32A', 'U8A':'I32A', 'U16A':'I32A', 'U32A':'F64A', 'F32A':'F64A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'U8A':  {'I8A':'I16A', 'I16A':'I16A', 'I32A':'I32A', 'U8A':'U8A',  'U16A':'U16A', 'U32A':'U32A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'U16A': {'I8A':'I32A', 'I16A':'I32A', 'I32A':'I32A', 'U8A':'U16A', 'U16A':'U16A', 'U32A':'U32A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'U32A': {'I8A':'F64A', 'I16A':'F64A', 'I32A':'F64A', 'U8A':'U32A', 'U16A':'U32A', 'U32A':'U32A', 'F32A':'F64A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'F32A': {'I8A':'F32A', 'I16A':'F32A', 'I32A':'F64A', 'U8A':'F32A', 'U16A':'F32A', 'U32A':'F64A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F32A', 'S16A':'F32A', 'S32A':'F64A', 'GA':'GA'},  
	'F64A': {'I8A':'F64A', 'I16A':'F64A', 'I32A':'F64A', 'U8A':'F64A', 'U16A':'F64A', 'U32A':'F64A', 'F32A':'F64A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},  
	'S8A':  {'I8A':'F64A', 'I16A':'F64A', 'I32A':'F64A', 'U8A':'F64A', 'U16A':'F64A', 'U32A':'F64A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},
	'S16A': {'I8A':'F64A', 'I16A':'F64A', 'I32A':'F64A', 'U8A':'F64A', 'U16A':'F64A', 'U32A':'F64A', 'F32A':'F32A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},
	'S32A': {'I8A':'F64A', 'I16A':'F64A', 'I32A':'F64A', 'U8A':'F64A', 'U16A':'F64A', 'U32A':'F64A', 'F32A':'F64A', 'F64A':'F64A', 'S8A':'F64A', 'S16A':'F64A', 'S32A':'F64A', 'GA':'GA'},
	'GA':   {'I8A':'GA',   'I16A':'GA',   'I32A':'GA',   'U8A':'GA',   'U16A':'GA',   'U32A':'GA',   'F32A':'GA',   'F64A':'GA',   'S8A':'GA',   'S16A':'GA',   'S32A':'GA',   'GA':'GA'},  
};

const TYPED_ARRAY_FROM_NM = {
	'I8A': Int8Array,
	'I16A': Int16Array,
	'I32A': Int32Array,
	'U8A': Uint8Array,
	'U16A': Uint16Array,
	'U32A': Uint32Array,
	'F32A': Float32Array,
	'F64A': Float64Array,
	'GA': Array,
};

const TypedArrays = [Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array, Float32Array, Float64Array];

for(let Type of TypedArrays){
	// 데이터형 체킹
	Type.prototype.isArray = function(){return true;};
	Type.prototype.isTypedArray = function(){return true;};
	
	// 생성 메소드
	
	Type.make = function(array){return new Type(array);};
	
	Type.numbers = 
	Type.makeNumbers = function(start, n, step){ // start부터 n개의 숫자를 step 간격으로
		if(step == undefined) step = 1;
		if(n == undefined) n = start, start = 0;
		n = Math.floor(n);
		return new Type(n??0).fill(0).map((x,i)=>(start)+i*(step));
	};

	Type.linspace = 
	Type.makeLinspace = function(a, b, s){ // a부터 b까지의 숫자를 시작과 끝 포함 s등분함
		return new Type(s).fill(0).map((x,i)=>a+i*(b-a)/(s-1));
	};

	Type.randoms = 
	Type.makeRandoms = function(n,k){ // 정수형의 경우는 항상 0으로만 나오기에 미리 곱해줌
		return new Type(n).fill(0).map(x=>Math.random() * (k??1));
	};
	
	if(Type.isIntArray){
		Type.prototype.setScale = function(num, den, bias){
			this.bias = bias ?? 0;
			this.num = num ?? 1;
			this.den = den ?? 1;
			this.scaled = true;
			return this;
		};
	}
	
	
	// 16진법 문자열에서 불러옴, Big Endian 방식
	// FEB283501335AA -> FEB2 8350 1335 AA00 (right pad)
	Type.fromHexSequenceBE = function(str){
		const NPE = this.BYTES_PER_ELEMENT * 2; // Nibble
		let arr = new Type(str.length.div(NPE).ceil());
		
		arr.length.for(function(i){
			arr[i] = parseInt(str.slice(i*NPE, (i+1)*NPE).padEnd(NPE,0),16); // 원 데이터이므로 무조건 원 데이터로 접근해야 함
		});
		return arr;
	};
	
	Type.prototype.toHexSequenceBE = function(){
		let s = '';
		let that = this;
		this.length.for(function(i){
			s += (that[i] & ((-1) >>> (32-Type.BYTES_PER_ELEMENT*8))).toString(16).padStart(Type.BYTES_PER_ELEMENT*2,0); 
		});
		//if(this.num)
		//s += ';'+this.num+','+this.den+','+this.bias;
		return s;
	};
	
	
	
	
	/*
	// Little Endian 방식
	// FEB283501335AA -> B2FE 5083 3513 00AA (left pad)
	Type.fromHexSequenceLE = function(){
		const NPE = this.BYTES_PER_ELEMENT * 2; // Nibble
		let arr = new Type(str.length.div().ceil());
		
		arr.length.for(function(i){
			arr[i] = parseInt(str.slice(i*NPE, (i+1)*NPE).padStart(NPE,0),16); // 원 데이터이므로 무조건 원 데이터로 접근해야 함
		});
		return arr;
	};
	*/
	
	
	
	
	// .~~~ 메소드는 스케일 반영
	
	if(Type.isIntArray){
		
		
		Type.prototype.getMaxValue = function(){
			return Type.RAW_MAX_VALUE;
		};
		Type.prototype.getMinValue = function(){
			return Type.RAW_MIN_VALUE;
		};
		
		
		
	}else{
		
	}
	
	// 연산 메소드, 숫자 연산만 허용되므로 unary, binary, ternary를 직접 제공하진 않음
	
	Type.prototype.unary = function(op){
		
		return this.map(a=>Object.operations[op](a));
	};
	
	Type.prototype.binary = function(op, other){
		if(other === undefined){
			return this.length ? this.reduce((a,b)=>Object.operations[op](a,b)) : Number.identities[op];
		}
		
		if(other.isTypedArray()){ // TypedArray op TypedArray
			let that = this;
			
			if(this.length != other.length){
				if(this.length == 1){
					if(this.nm == other.nm)
						return other.map((a,i)=>Object.operations[op](that.at(0), a));
					return new TYPED_ARRAY_FROM_NM[TYPE_BINARY_OP[this.nm][other.nm]](other.length).map((a,i)=>Object.operations[op](that.at(0), other.at(i)));
				}
				if(other.length == 1){
					if(this.nm == other.nm)
						return this.map((a,i)=>Object.operations[op](a, other.at(0)));
					return new TYPED_ARRAY_FROM_NM[TYPE_BINARY_OP[this.nm][other.nm]](this.length).map((a,i)=>Object.operations[op](that.at(i), other.at(0)));
				}
				throw new SizeMismatchError(this.length - other.length);
			}
			if(this.nm == other.nm)
				return this.map((a,i)=>Object.operations[op](a, other.at(i)));
			else{
				return new TYPED_ARRAY_FROM_NM[TYPE_BINARY_OP[this.nm][other.nm]](this.length).map((a,i)=>Object.operations[op](that.at(i), other.at(i)));
			}
		}else if(other.isArray()){ // TypedArray op Array -> Array op Array
			return this.toArray()[op](other);
		}else if(typeof other != 'object'){
			return this.map((a)=>Object.operations[op](a, other));
		}
		throw new TypeError('>_< 타입이상!');
	};
	
	Type.prototype.ternary = function(op, other, ...hyper){
		if(other === undefined){
			return this.length ? this.reduce((a,b)=>Object.operations[op](a,b, ...hyper)) : Number.identities[op];
		}
		if(other.isTypedArray()){ // TypedArray op TypedArray
			let that = this;
			
			if(this.length != other.length){
				if(this.length == 1){
					if(this.nm == other.nm)
						return other.map((a,i)=>Object.operations[op](that.at(0), a, ...hyper));
					return new TYPED_ARRAY_FROM_NM[TYPE_BINARY_OP[this.nm][other.nm]](other.length).map((a,i)=>Object.operations[op](that.at(0), other.at(i), ...hyper));
				}
				if(other.length == 1){
					if(this.nm == other.nm)
						return this.map((a,i)=>Object.operations[op](a, other.at(0), ...hyper));
					return new TYPED_ARRAY_FROM_NM[TYPE_BINARY_OP[this.nm][other.nm]](this.length).map((a,i)=>Object.operations[op](that.at(i), other.at(0), ...hyper));
				}
				throw new SizeMismatchError(this.length - other.length);
			}
			if(this.nm == other.nm)
				return this.map((a,i)=>Object.operations[op](a, other.at(i), ...hyper));
			else{
				return new TYPED_ARRAY_FROM_NM[TYPE_BINARY_OP[this.nm][other.nm]](this.length).map((a,i)=>Object.operations[op](that.at(i), other.at(i), ...hyper));
			}
		}else if(other.isGeneralArray()){ // TypedArray op Array -> Array op Array
			return this.toArray()[op](other);
		}else if(typeof other != 'object'){
			return this.map((a)=>Object.operations[op](a, other, ...hyper));
		}
		throw new TypeError();
	};
	
	Type.prototype.sum = Type.prototype.add;
	Type.prototype.mean = function(){return this.sum() / this.length;};
	Type.prototype.var = function(){
		let mean = this.mean();
		return this.reduce((a,b)=>a + (b-mean)*(b-mean),0).div(this.length);
	};
	Type.prototype.stdev = function(){
		let mean = this.mean();
		return this.reduce((a,b)=>a + (b-mean)*(b-mean),0).div(this.length).sqrt();
	};
	Type.prototype.sumprod = function(other){
		let A = new Float64Array(this); // 오버플로 방지
		let B = other === undefined ? A : new Float64Array(other);
		return A.mul(B).sum();
	};
	Type.prototype.N = function(){
		return this.length;
	};
	Type.prototype.max = Type.prototype.greatest;
	Type.prototype.min = Type.prototype.least;
	
	Type.prototype.toStringEx = function(){
		return this.constructor.name.slice(0,-5)+'['+this+']';
	};
	
	// 형변환 (기본 절삭, 반올림 선택 가능)
	Array.prototype['to'+Type.name] = function(){return Type.from(this);};
	if(Type.isIntArray)
		Array.prototype['roundTo'+Type.name] = function(){return Type.from(this.round());};
	Type.prototype.toArray = function(){
		return Array.from(this);
	};
	for(let Dest of TypedArrays){
		Type.prototype['to'+Dest.name] = function(){return Dest.from(this);};
		if(Dest.isIntArray)
			Type.prototype['roundTo'+Dest.name] = function(){return Dest.from(this.round());};
	}
	
	Type.prototype.copy = function(){
		return new Type(this);
	};
	
	Type.prototype.reverseCopy = function(){
		return this.copy().reverse();
	};
	
	Type.prototype.paste = function(other){ // 내 배열로 붙여넣기
		//this.length = other.length;
		if(this.length != other.length) throw new SizeMismatchError(`크기 불일치: ${this.length}:${other.length}`);
		for(let i of this.length){
			this[i] = other[i]; // 숫자만 저장되기에 별도로 복사할 필요가 없다
		}
		return this;
	};
	Type.prototype.pasteTo = function(other){ // 다른 배열에게 내 배열을 붙여넣기
		return other.paste(this);
	};

	
	// 누적, 역시 Float64Array 규정에 따름
	Type.prototype.accum = function(operator, isRight){
		let cum = this[isRight ? this.length-1 : 0];
		if(isRight)
			return this.reverseCopy().map((a,i,A)=>(cum = i ? Object.operations[operator](cum,a) : cum)).reverse();
		return this.map((a,i,A)=>(cum = i ? Object.operations[operator](cum,a) : cum));
	};
	
	// 실제 값 접근, 일반 TypedArray는 기존 적용
	let handler = {
		get: function(target, i){
			return target.at(i);
		},
		set: function(target, i, v){
			return target.setAt(i,v);
		},
	};
	
	// TypedArray의 경우는 덮어쓰기 방식을 사용함
	// 끝의 값을 정해야 하며 틀리면 RangeError 발생
	
	
	Type.prototype.mid = function(a,b,reversed){
		return new TypedArrayPointer(this, a, b, reversed);
	};

	Type.prototype.left = function(a, reversed){
		return new TypedArrayPointer(this, 0, a, reversed);
	};

	Type.prototype.right = function(a, reversed){
		return new TypedArrayPointer(this, this.length-a, this.length, reversed)
	};

	Type.prototype.__defineGetter__('all', function(){
		return new TypedArrayPointer(this, 0, this.length, false);
	});

	Type.prototype.__defineGetter__('rev', function(){
		return new TypedArrayPointer(this, 0, this.length, true);
	});


	
	/*
	Type.prototype.mid = function(a,b){
		return new TypedArrayPointer(this, a, b);
	};
	
	Type.prototype.left = function(a){
		return new TypedArrayPointer(this, 0, a);
	};
	
	Type.prototype.right = function(a){
		return new TypedArrayPointer(this, this.length-a, this.length);
	};
	
	Type.prototype.__defineGetter__('all', function(){
		return new TypedArrayPointer(this, 0, this.length);
	});
	*/
	
	
	Type.prototype.__defineGetter__('value', function(){
		return this;
	});

	Type.prototype.__defineSetter__('value', function(arr){
		if(arr.isArray())
			this.paste(arr);
		else
			this.fill(arr);
	});

	
	Type.prototype.__defineGetter__('MIN_VALUE', function(){
		return Type.RAW_MIN_VALUE;
	});
	
	Type.prototype.__defineGetter__('MAX_VALUE', function(){
		return Type.RAW_MAX_VALUE;
	});
	
	Type.prototype.__defineGetter__('EPSILON', function(){
		return Type.RAW_EPSILON;
	});
	
	
	Type.prototype.setAt = function(idx, value){
		return this[idx] = value;
	};
	
	for(let op in Gfunc){
		Type.prototype[op] = Array.prototype[op];
	}
	
};

// 8비트 배열에서는 256개이므로 사용 가능한 모든 숫자 표시, num, den, bias를 줄 수도 있음

Uint8Array.availableValues = function(num,den,bias){
	let array = new Uint8Array(256);
	array.forEach((x,i,A)=>A[i] = i);
	if(num !== undefined)
		array.setScale(num,den??1,bias??0);
	return array;
};

Int8Array.availableValues = function(num,den,bias){
	let array = new Int8Array(256);
	array.forEach((x,i,A)=>A[i] = i-128);
	if(num !== undefined)
		array.setScale(num,den??1,bias??0);
	return array;
};


/*

<< 기본 정수형 조절 타입 >>

Scaled8/16/32Array
- num : 해당 배열에서 곱해질 수
- den : 해당 배열에서 나눠질 수 (부동소수점 오차 방지)
- bias: 해당 배열에서 더해질 수 (뺄 수는 '-' 로 저장)
- 위의 값은 각각 기본적으로 1, 1, 0을 저장함
- 모든 산술 연산(A.add(B) 등)을 할 경우, 불필요한 환산과 정보의 손실을 막기 위해서 Float64Array로 강제로 변환

- new Scaled8Array({num:10}, 10) : 배율의 10인 값 10개를 준비
- new Scaled8Array({den:10}, 10) : 배율의 1/10(0.1)인 값 10개를 준비
- new Scaled8Array({bias:10}, 10): 10을 기준으로 하는 값 10개를 준비
- 위 생성자는 모두 실제론 0을 저장함으로써, 연산 시 bias(기준)값으로 채워졌다고 보면 됨

- new Scaled8Array({den:10}, [7.882, Math.PI, Math.E]) : 배율이 1/10이므로 소수 둘째자리에서 반올림하여 7.9,3.1,2.7 (실제론 79,31,27) 이 저장됨

- 전역함수 makeBestScaledArray 를 통해서 저장할 최솟값 및 최댓값 범위 배율을 지정할 경우 해당 배열 추천, 초과할 시 Float64Array
- makeBestScaledArray({min:300, max:400, den:2},[314.2,376.7]).toStringEx(); // Scaled8[314,376.5]
- makeBestScaledArray({min:300, max:400, den:10},[314.2,376.7]).toStringEx(); // Scaled16[314.2,376.7]
- 지정된 배열이며, 배열 길이가 1 이상인 상태에서 min, max를 지정하지 않을 경우, 해당 배열의 최소/최댓값을 사용
- 그렇지 않을 경우, -10000 ~ 10000 을 기본으로 적용함
- 분자(num), 분모(den) 모두 미지정시 기본 1/100으로 처리

- [중요] 배열 접근 방법은 일반적인 방식으로 하면 환산 전의 원래 값으로 적용됨
- 따라서, 다음과 같은 접근 방법 사용
- a.val[i]         : 단일 값 접근
- a.left(N).value  : 첫 N개 값 접근
- a.right(N).value : 뒤 N개 값 접근
- a.mid(M,N).value : M부터 N까지 구간 값 접근
- a.all.value      : 전체 접근
- 해당 값을 읽을 시 환산, 쓸 경우엔 역환산 적용 후 반올림 적용
- 호환을 위해 Array, TypedArray 모두 해당 연산 사용 가능

- 스케일 미 지정시 기본값
- Scaled8Array     : 1/10
- Scaled16Array    : 1/100
- Scaled24Array    : 1/1000
- Scaled32Array    : 1/10000
- BigScaled64Array : 1/100000000n


*/



class _Scaled8Array extends Int8Array{
	static DEFAULT_DEN = 10;
	constructor(scaleInfo, array_or_size){
		if(array_or_size === undefined){
			if((scaleInfo.num ?? scaleInfo.den ?? scaleInfo.bias) === undefined)
				array_or_size = scaleInfo, scaleInfo = {};
			else array_or_size = 0;
		}
		let num, den;
		if(scaleInfo.num === undefined && scaleInfo.den === undefined){
			num = 1; den = 10;
		}else{
			num = scaleInfo.num ?? 1;
			den = scaleInfo.den ?? 1;
		}
		let bias = scaleInfo.bias ?? 0;
		
		if(isNaN(num)) num = 1;
		if(isNaN(den)) den = 1;
		
		if(den < 1){
			num *= 1/den;
			den = 1;
		};
		if(isNaN(bias)) bias = 0;
		
		// 데이터에 넣기 위해서 변환함, 역함수 사용
		if(array_or_size !== undefined && array_or_size.isArray()){
			super(array_or_size.unmdar(num,den,bias));
		}else{ // 숫자를 넣게 된다면 배열 크기임
			super(array_or_size);
		}
		
		// 나머지 파라미터 저장
		this.num  = num;
		this.den  = den;
		this.bias = bias;
		// 분수와 분모는 무조건 1 이상이어야 함
		
	};
	matchToScaleInfo(other){
		this.num = other.num ?? 1;
		this.den = other.den ?? 1;
		this.bias = other.bias ?? 0;
		return this.proxy ?? this;
	};
	static from(scaleInfo, iterable){
		if(iterable === undefined){
			if((scaleInfo.num ?? scaleInfo.den ?? scaleInfo.bias) === undefined)
				iterable = scaleInfo, scaleInfo = {};
			else iterable = 0;
		}
		let num, den;
		if(scaleInfo.num === undefined && scaleInfo.den === undefined){
			num = 1; den = 10;
		}else{
			num = scaleInfo.num ?? 1;
			den = scaleInfo.den ?? 1;
		}
		let bias = scaleInfo.bias ?? 0;
		
		if(isNaN(num)) num = 1;
		if(isNaN(den)) den = 1;
		
		if(den < 1){
			num *= 1/den;
			den = 1;
		};
		if(isNaN(bias)) bias = 0;
		
		// 데이터에 넣기 위해서 변환함, 역함수 사용
		let array = super.from(iterable.$unmdar(num,den,bias));
		
		// 나머지 파라미터 저장
		array.num  = num;
		array.den  = den;
		array.bias = bias;
		// 분수와 분모는 무조건 1 이상이어야 함
		
		return array;
	};
	at(idx){
		return Object.operations.mda(super.at(idx),this.num,this.den,this.bias);
	};
	setAt(idx,value){
		return super[idx] = Object.operations.unmdar(value,this.num,this.den,this.bias);
	};
	rawAt(idx){
		return super.at(idx);
	};
	rawSetAt(idx,value){
		return super[idx] = value;
	};
	
	
	map(fn){ // 매핑 연산은 무조건 64비트 실수 형으로 반환
		return this.toFloat64Array().map(fn);
	};
	reduce(fn, init){
		if(init === undefined)
			return super.reduce((a,b,i,A) => i > 1 ? fn(a,b.mda(this.num,this.den,this.bias),i,A) : fn(a.mda(this.num,this.den,this.bias),b.mda(this.num,this.den,this.bias),i,A));
		return super.reduce((a,b,i,A) => fn(a,b.mda(this.num,this.den,this.bias),i,A), init);
	};
	reduceRight(fn, init){
		if(init === undefined)
			return super.reduceRight((a,b,i,A) => i < A.length-2 ? fn(a,b.mda(this.num,this.den,this.bias),i,A) : fn(a.mda(this.num,this.den,this.bias),b.mda(this.num,this.den,this.bias),i,A));
		return super.reduceRight((a,b,i,A) => fn(a,b.mda(this.num,this.den,this.bias),i,A), init);
	};
	forEach(fn){
		return super.forEach((a,i,A) => fn(a.mda(this.num,this.den,this.bias),i,A));
	};
	slice(...args){
		return super.slice(...args).matchToScaleInfo(this);
	};
	subarray(...args){
		return super.subarray(...args).matchToScaleInfo(this);
	};
	fill(...args){
		args[0] = args[0].unmdar(this.num, this.den, this.bias);
		return super.fill(...args);
	};
	set(...args){
		args[0] = args[0].unmdar(this.num, this.den, this.bias);
		return super.set(...args);
	};
	copy(){
		return new Scaled8Array({num:this.num, den:this.den, bias:this.bias}, this);
	};
	toArray(){
		let array = new Array(this.length);
		this.forEach((a,i,A)=>array[i] = a);
		return array;
	};
	toString(){
		return this.precise().join(',');
	};
	get MIN_VALUE(){
		return super.MIN_VALUE.mda(this.num, this.den, this.bias);
	};
	get MAX_VALUE(){
		return super.MAX_VALUE.mda(this.num, this.den, this.bias);
	};
	get EPSILON(){
		return this.num / this.den;
	};
	static fromHexSequenceBE(scaleInfo, str){
		const NPE = this.BYTES_PER_ELEMENT * 2; // Nibble
		let arr = new Scaled8Array(str.length.div(NPE).ceil()).matchToScaleInfo(scaleInfo);
		
		arr.length.for(function(i){
			arr.rawSetAt(i,parseInt(str.slice(i*NPE, (i+1)*NPE).padEnd(NPE,0),16)); // 원 데이터이므로 무조건 원 데이터로 접근해야 함
		});
		return arr;
	};
	[Symbol.iterator](){
		let that = this;
		let i = -1;
		return{
			next: () => ({value:that.at(++i), done:!(i<that.length)})
		};
	};
};


class Scaled8Array{ // 첨자 기능 포함
	static DEFAULT_DEN = 10;
	static handler = {
		get: (object, key) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				return object.at(key);
			}
			const ret = Reflect.get(object, key);
			return typeof ret === 'function' ? ret.bind(object) : ret;
		},
		set: (object, key, value) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				object.setAt(key, value);
				return true;
			}
			Reflect.set(object, key, value);
			return true;
		},
		has: (object, key) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				return true;
			}
			return Reflect.has(object, key);
		},
	};
	constructor(...args){
		return this.proxy = new Proxy(new _Scaled8Array(...args), Scaled8Array.handler);
	};
	static from(...args){
		return this.proxy = new Proxy(_Scaled8Array.from(...args), Scaled8Array.handler);
	};
	static fromHexSequenceBE(...args){
		return this.proxy = new Proxy(_Scaled8Array.fromHexSequenceBE(...args), Scaled8Array.handler);
	};
};



class _Scaled16Array extends Int16Array{
	static DEFAULT_DEN = 100;
	constructor(scaleInfo, array_or_size){
		if(array_or_size === undefined){
			if((scaleInfo.num ?? scaleInfo.den ?? scaleInfo.bias) === undefined)
				array_or_size = scaleInfo, scaleInfo = {};
			else array_or_size = 0;
		}
		let num, den;
		if(scaleInfo.num === undefined && scaleInfo.den === undefined){
			num = 1; den = 100;
		}else{
			num = scaleInfo.num ?? 1;
			den = scaleInfo.den ?? 1;
		}
		let bias = scaleInfo.bias ?? 0;
		
		if(isNaN(num)) num = 1;
		if(isNaN(den)) den = 1;
		
		if(den < 1){
			num *= 1/den;
			den = 1;
		};
		if(isNaN(bias)) bias = 0;
		
		// 데이터에 넣기 위해서 변환함, 역함수 사용
		if(array_or_size !== undefined && array_or_size.isArray()){
			super(array_or_size.unmdar(num,den,bias));
		}else{ // 숫자를 넣게 된다면 배열 크기임
			super(array_or_size);
		}
		
		// 나머지 파라미터 저장
		this.num  = num;
		this.den  = den;
		this.bias = bias;
		// 분수와 분모는 무조건 1 이상이어야 함
		
	};
	matchToScaleInfo(other){
		this.num = other.num ?? 1;
		this.den = other.den ?? 1;
		this.bias = other.bias ?? 0;
		return this;
	};
	static from(scaleInfo, iterable){
		if(iterable === undefined){
			if((scaleInfo.num ?? scaleInfo.den ?? scaleInfo.bias) === undefined)
				iterable = scaleInfo, scaleInfo = {};
			else iterable = 0;
		}
		let num, den;
		if(scaleInfo.num === undefined && scaleInfo.den === undefined){
			num = 1; den = 100;
		}else{
			num = scaleInfo.num ?? 1;
			den = scaleInfo.den ?? 1;
		}
		let bias = scaleInfo.bias ?? 0;
		
		if(isNaN(num)) num = 1;
		if(isNaN(den)) den = 1;
		
		if(den < 1){
			num *= 1/den;
			den = 1;
		};
		if(isNaN(bias)) bias = 0;
		
		// 데이터에 넣기 위해서 변환함, 역함수 사용
		let array = super.from(iterable.$unmdar(num,den,bias));
		
		// 나머지 파라미터 저장
		array.num  = num;
		array.den  = den;
		array.bias = bias;
		// 분수와 분모는 무조건 1 이상이어야 함
		
		return array;
	};
	at(idx){
		return Object.operations.mda(super.at(idx),this.num,this.den,this.bias);
	};
	setAt(idx,value){
		return super[idx] = Object.operations.unmdar(value,this.num,this.den,this.bias);
	};
	rawAt(idx){
		return super.at(idx);
	};
	rawSetAt(idx,value){
		return super[idx] = value;
	};
	
	map(fn){ // 매핑 연산은 무조건 64비트 실수 형으로 반환
		return this.toFloat64Array().map(fn);
	};
	reduce(fn, init){
		if(init === undefined)
			return super.reduce((a,b,i,A) => i > 1 ? fn(a,b.mda(this.num,this.den,this.bias),i,A) : fn(a.mda(this.num,this.den,this.bias),b.mda(this.num,this.den,this.bias),i,A));
		return super.reduce((a,b,i,A) => fn(a,b.mda(this.num,this.den,this.bias),i,A), init);
	};
	reduceRight(fn, init){
		if(init === undefined)
			return super.reduceRight((a,b,i,A) => i < A.length-2 ? fn(a,b.mda(this.num,this.den,this.bias),i,A) : fn(a.mda(this.num,this.den,this.bias),b.mda(this.num,this.den,this.bias),i,A));
		return super.reduceRight((a,b,i,A) => fn(a,b.mda(this.num,this.den,this.bias),i,A), init);
	};
	forEach(fn){
		return super.forEach((a,i,A) => fn(a.mda(this.num,this.den,this.bias),i,A));
	};
	slice(...args){
		return super.slice(...args).matchToScaleInfo(this);
	};
	subarray(...args){
		return super.subarray(...args).matchToScaleInfo(this);
	};
	fill(...args){
		args[0] = args[0].unmdar(this.num, this.den, this.bias);
		return super.fill(...args);
	};
	set(...args){
		args[0] = args[0].unmdar(this.num, this.den, this.bias);
		return super.set(...args);
	};
	copy(){
		return new Scaled16Array({num:this.num, den:this.den, bias:this.bias}, this);
	};
	toArray(){
		let array = new Array(this.length);
		this.forEach((a,i,A)=>array[i] = a);
		return array;
	};
	toString(){
		return this.precise().join(',');
	};
	get MIN_VALUE(){
		return super.MIN_VALUE.mda(this.num, this.den, this.bias);
	};
	get MAX_VALUE(){
		return super.MAX_VALUE.mda(this.num, this.den, this.bias);
	};
	get EPSILON(){
		return this.num / this.den;
	};
	static fromHexSequenceBE(scaleInfo, str){
		const NPE = this.BYTES_PER_ELEMENT * 2; // Nibble
		let arr = new Scaled16Array(str.length.div(NPE).ceil()).matchToScaleInfo(scaleInfo);
		
		arr.length.for(function(i){
			arr.rawSetAt(i, parseInt(str.slice(i*NPE, (i+1)*NPE).padEnd(NPE,0),16)); // 원 데이터이므로 무조건 원 데이터로 접근해야 함
		});
		return arr;
	};
	[Symbol.iterator](){
		let that = this;
		let i = -1;
		return{
			next: () => ({value:that.at(++i), done:!(i<that.length)})
		};
	};
};


class Scaled16Array{ // 첨자 기능 포함
	static DEFAULT_DEN = 100;
	static handler = {
		get: (object, key) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				return object.at(key);
			}
			const ret = Reflect.get(object, key);
			return typeof ret === 'function' ? ret.bind(object) : ret;
		},
		set: (object, key, value) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				object.setAt(key, value);
				return true;
			}
			Reflect.set(object, key, value);
			return true;
		},
		has: (object, key) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				return true;
			}
			return Reflect.has(object, key);
		},
	};
	constructor(...args){
		return this.proxy = new Proxy(new _Scaled16Array(...args), Scaled16Array.handler);
	};
	static from(...args){
		return this.proxy = new Proxy(_Scaled16Array.from(...args), Scaled16Array.handler);
	};
	static fromHexSequenceBE(...args){
		return this.proxy = new Proxy(_Scaled16Array.fromHexSequenceBE(...args), Scaled16Array.handler);
	};
	
};



class _Scaled32Array extends Int32Array{
	static DEFAULT_DEN = 10000;
	constructor(scaleInfo, array_or_size){
		if(array_or_size === undefined){
			if((scaleInfo.num ?? scaleInfo.den ?? scaleInfo.bias) === undefined)
				array_or_size = scaleInfo, scaleInfo = {};
			else array_or_size = 0;
		}
		let num, den;
		if(scaleInfo.num === undefined && scaleInfo.den === undefined){
			num = 1; den = 10000;
		}else{
			num = scaleInfo.num ?? 1;
			den = scaleInfo.den ?? 1;
		}
		let bias = scaleInfo.bias ?? 0;
		
		if(isNaN(num)) num = 1;
		if(isNaN(den)) den = 1;
		
		if(den < 1){
			num *= 1/den;
			den = 1;
		};
		if(isNaN(bias)) bias = 0;
		
		// 데이터에 넣기 위해서 변환함, 역함수 사용
		if(array_or_size !== undefined && array_or_size.isArray()){
			super(array_or_size.unmdar(num,den,bias));
		}else{ // 숫자를 넣게 된다면 배열 크기임
			super(array_or_size);
		}
		
		// 나머지 파라미터 저장
		this.num  = num;
		this.den  = den;
		this.bias = bias;
		// 분수와 분모는 무조건 1 이상이어야 함
		
	};
	matchToScaleInfo(other){
		this.num = other.num ?? 1;
		this.den = other.den ?? 1;
		this.bias = other.bias ?? 0;
		return this;
	};
	static from(scaleInfo, iterable){
		if(iterable === undefined){
			if((scaleInfo.num ?? scaleInfo.den ?? scaleInfo.bias) === undefined)
				iterable = scaleInfo, scaleInfo = {};
			else iterable = 0;
		}
		let num, den;
		if(scaleInfo.num === undefined && scaleInfo.den === undefined){
			num = 1; den = 10000;
		}else{
			num = scaleInfo.num ?? 1;
			den = scaleInfo.den ?? 1;
		}
		let bias = scaleInfo.bias ?? 0;
		
		if(isNaN(num)) num = 1;
		if(isNaN(den)) den = 1;
		
		if(den < 1){
			num *= 1/den;
			den = 1;
		};
		if(isNaN(bias)) bias = 0;
		
		// 데이터에 넣기 위해서 변환함, 역함수 사용
		let array = super.from(iterable.$unmdar(num,den,bias));
		
		// 나머지 파라미터 저장
		array.num  = num;
		array.den  = den;
		array.bias = bias;
		// 분수와 분모는 무조건 1 이상이어야 함
		
		return array;
	};
	at(idx){
		return Object.operations.mda(super.at(idx),this.num,this.den,this.bias);
	};
	setAt(idx,value){
		return super[idx] = Object.operations.unmdar(value,this.num,this.den,this.bias);
	};
	rawAt(idx){
		return super.at(idx);
	};
	rawSetAt(idx,value){
		return super[idx] = value;
	};
	
	map(fn){ // 매핑 연산은 무조건 64비트 실수 형으로 반환
		return this.toFloat64Array().map(fn);
	};
	reduce(fn, init){
		if(init === undefined)
			return super.reduce((a,b,i,A) => i > 1 ? fn(a,b.mda(this.num,this.den,this.bias),i,A) : fn(a.mda(this.num,this.den,this.bias),b.mda(this.num,this.den,this.bias),i,A));
		return super.reduce((a,b,i,A) => fn(a,b.mda(this.num,this.den,this.bias),i,A), init);
	};
	reduceRight(fn, init){
		if(init === undefined)
			return super.reduceRight((a,b,i,A) => i < A.length-2 ? fn(a,b.mda(this.num,this.den,this.bias),i,A) : fn(a.mda(this.num,this.den,this.bias),b.mda(this.num,this.den,this.bias),i,A));
		return super.reduceRight((a,b,i,A) => fn(a,b.mda(this.num,this.den,this.bias),i,A), init);
	};
	forEach(fn){
		return super.forEach((a,i,A) => fn(a.mda(this.num,this.den,this.bias),i,A));
	};
	slice(...args){
		return super.slice(...args).matchToScaleInfo(this);
	};
	subarray(...args){
		return super.subarray(...args).matchToScaleInfo(this);
	};
	fill(...args){
		args[0] = args[0].unmdar(this.num, this.den, this.bias);
		return super.fill(...args);
	};
	set(...args){
		args[0] = args[0].unmdar(this.num, this.den, this.bias);
		return super.set(...args);
	};
	copy(){
		return new Scaled32Array({num:this.num, den:this.den, bias:this.bias}, this);
	};
	toArray(){
		let array = new Array(this.length);
		this.forEach((a,i,A)=>array[i] = a);
		return array;
	};
	toString(){
		return this.precise().join(',');
	};
	get MIN_VALUE(){
		return super.MIN_VALUE.mda(this.num, this.den, this.bias);
	};
	get MAX_VALUE(){
		return super.MAX_VALUE.mda(this.num, this.den, this.bias);
	};
	get EPSILON(){
		return this.num / this.den;
	};
	static fromHexSequenceBE(scaleInfo, str){
		const NPE = this.BYTES_PER_ELEMENT * 2; // Nibble
		let arr = new Scaled32Array(str.length.div(NPE).ceil()).matchToScaleInfo(scaleInfo);
		
		arr.length.for(function(i){
			arr.rawSetAt(i, parseInt(str.slice(i*NPE, (i+1)*NPE).padEnd(NPE,0),16)); // 원 데이터이므로 무조건 원 데이터로 접근해야 함
		});
		return arr;
	};
	[Symbol.iterator](){
		let that = this;
		let i = -1;
		return{
			next: () => ({value:that.at(++i), done:!(i<that.length)})
		};
	};
};


class Scaled32Array{ // 첨자 기능 포함
	static DEFAULT_DEN = 10000;
	static handler = {
		get: (object, key) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				return object.at(key);
			}
			const ret = Reflect.get(object, key);
			return typeof ret === 'function' ? ret.bind(object) : ret;
		},
		set: (object, key, value) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				object.setAt(key, value);
				return true;
			}
			Reflect.set(object, key, value);
			return true;
		},
		has: (object, key) => {
			if(typeof key !== 'symbol' && !Number.isNaN(Number(key))){
				return true;
			}
			return Reflect.has(object, key);
		},
	};
	constructor(...args){
		return this.proxy = new Proxy(new _Scaled32Array(...args), Scaled32Array.handler);
	};
	static from(...args){
		return this.proxy = new Proxy(_Scaled32Array.from(...args), Scaled32Array.handler);
	};
	static fromHexSequenceBE(...args){
		return this.proxy = new Proxy(_Scaled32Array.fromHexSequenceBE(...args), Scaled32Array.handler);
	};
	
};


TYPED_ARRAY_FROM_NM['S8A'] = Scaled8Array;
TYPED_ARRAY_FROM_NM['S16A'] = Scaled16Array;
TYPED_ARRAY_FROM_NM['S32A'] = Scaled32Array;

Scaled8Array .nm = Scaled8Array.prototype.nm  = _Scaled8Array .nm = _Scaled8Array.prototype.nm  = 'S8A';
Scaled16Array.nm = Scaled16Array.prototype.nm = _Scaled16Array.nm = _Scaled16Array.prototype.nm = 'S16A';
Scaled32Array.nm = Scaled32Array.prototype.nm = _Scaled32Array.nm = _Scaled32Array.prototype.nm = 'S32A';

// ScaledArray <-> TypedArray(Array 포함)

/*
Array Travel Test
a = new Uint8Array([125,72,57,33]);
a.toScaled8Array({num:10})
 .toScaled8Array({num:7})
 .toFloat64Array()
 .toScaled16Array({num:3})
 .toArray()
 .toScaled8Array({num:5})
 .toInt8Array(); // Arrived [-126,70,65,25]
*/

for(let Type1 of [Scaled8Array, Scaled16Array, Scaled32Array]){
	for(let Type2 of TypedArrays.concat(Array)){
		Type1.prototype['to'+Type2.name] = function(){
			return Type2.from(this);
		};
		Type2.prototype['to'+Type1.name] = function(scaleInfo){
			return Type1.from(scaleInfo ?? {den:Type1.DEFAULT_DEN}, this);
		};
		
	};
	
	Type1.numbers = 
	Type1.makeNumbers = function(scaleInfo, start, n, step){ // start부터 n개의 숫자를 step 간격으로
		if(step == undefined) step = 1;
		if(n == undefined) n = start, start = 0;
		n = Math.floor(n);
		return new Float64Array(n??0).fill(0).map((x,i)=>(start)+i*(step))['to'+Type1.name](scaleInfo);
	};

	Type1.linspace = 
	Type1.makeLinspace = function(scaleInfo, a, b, s){ // a부터 b까지의 숫자를 시작과 끝 포함 s등분함
		return new Float64Array(s).fill(0).map((x,i)=>a+i*(b-a)/(s-1))['to'+Type1.name](scaleInfo);
	};

	Type1.randoms = 
	Type1.makeRandoms = function(scaleInfo, n,k){ // 정수형의 경우는 항상 0으로만 나오기에 미리 곱해줌
		return new Float64Array(n).fill(0).map(x=>Math.random() * (k??1))['to'+Type1.name](scaleInfo);
	};
	
	
	// ScaledNArray는 접근 방식이 3가지가 존재함
	// a[i]      : 환산 없이 저장된 값 그대로 접근
	// a.val[i]  : 환산 적용하여 접근, 저장 시 역환산 (정수가 아니면 반올림)
	// a.all.val : 환산 적용한 값들 반환 (AsArray: Array타입으로)
	//             대입할 경우 각각 대입하여 역환산을 적용함
	//             숫자를 대입할 경우 전체가 반영됨
	
	let handler = {
		get: function(target, i){
			return target.at(i);
		},
		set: function(target, i, v){
			i = +i;
			return target[i < 0 ? i+target.length : i] = v.unmdar(target.num, target.den, target.bias);
		},
	};
	
	/*
	Type1.prototype.__defineGetter__('valuesAsArray', function(){
		return this.toArray();
	});
	Type1.prototype.__defineGetter__('values', function(){
		return this.toFloat64Array();
	});
	Type1.prototype.__defineSetter__('values', function(v){
		v.isArray() ? this.forEach((x,i,A)=>A.val[i] = v.val[i]) : this.forEach((x,i,A)=>A.val[i] = v);
		return v;
	});
	*/
	
	
	
}


const makeBestScaledArray = function(info, array_or_size){ // 15, 25, 2, 1 -> 16 18 20 22 24
	if(array_or_size === undefined) array_or_size = info, info = {}; // 자동추천
	let min = info.min ?? (array_or_size.isArray() && array_or_size.length ? array_or_size.min() : -10000);
	let max = info.max ?? (array_or_size.isArray() && array_or_size.length ? array_or_size.max() : 10000);
	let num = info.num ?? 1;
	let den = info.den ?? 1;
	
	if(info.digits > 0){
		num = 1;
		den = info.digits.pow10();
	}else if(info.digits <= 0){
		num = info.digits.minus().pow10();
		den = 1;
	}
	
	if(info.num === undefined && info.den === undefined && info.digits === undefined) den = 100; // 로직 변경 예정
	
	let bias = min.center(max).fractionRound(den);
	let ubound = ((max - bias) / (num) * (den)).round();
	
	if(ubound <= 127) return new Scaled8Array({num:num, den:den, bias:bias}, array_or_size);
	if(ubound <= 32767) return new Scaled16Array({num:num, den:den, bias:bias}, array_or_size);
	if(ubound <= 2147483647) return new Scaled32Array({num:num, den:den, bias:bias}, array_or_size);
	return new Float64Array(array_or_size);
};

// Set 관련 연산
// JS의 허술한 관리에 열받아서 작성함. 파이썬은 가능함.
// 출처: https://medium.com/@ayushksingh/set-in-javascript-3bb903397f2


Set.prototype.isSubSet  = function isSubSet(setB){
/* if the size of current set (say A) is more then the otherSet (say B) A cannot be a subSet of B */
   if(this.size > setB.size){
      return false;
    } else { 
      for (let el of this){
        if(!setB.has(el)){
          return false;
        } 
      }
      return true;
    }
};
Set.prototype.isSuperSet  = function isSuperSet(setB){
   if(this.size < setB.size){
      return false;
    } else { 
      for (let el of setB){
        if(!this.has(el)){
          return false;
        } 
      }
      return true;
    }
};



Set.prototype.union  = function union(setB) {
    let _union = new Set(this);
    for (let el of setB) {
        _union.add(el);
    }
    return _union;
};

Set.prototype.intersection = function intersection(setB) {
    let _intersection = new Set();
    for (let el of setB) {
        if (this.has(el)) {
            _intersection.add(el);
        }
    }
    return _intersection;
};

Set.prototype.symmetricDifference = function symmetricDifference( setB) {
    let _difference = new Set(this);
    for (let el of setB) {
        if (_difference.has(el)) {
            _difference.delete(el);
        } else {
            _difference.add(el);
        }
    }
    return _difference;
};

Set.prototype.setDifference =
Set.prototype.difference = function difference(setB) {
    let _difference = new Set(this);
    for (let el of setB) {
        _difference.delete(el);
    }
    return _difference;
};

Map.prototype.operation = function(fn, ...args){ // Map의 경우는 연산을 편하게 하기 위해서 다항으로 지원함
	fn ??= identical;
	let newMap = new Map();
	for(let [key, value] of this){
		if(args.some(x=>x.isMap() && !x.has(key))) throw new KeyMismatchError(`${key}: 불일치`);
			newMap.set(key, Gfunc.call(value, fn, ...args.map(x=>x.isMap() ? x.get(key) : x)));
	}
	if(args.length){ // 교차검증
		for(let arg of args){
			if(!arg.isMap()) continue; // Map이 아니면 검증대상 X
			for(let key of arg.keys()){
				if(!this.has(key)) throw new KeyMismatchError(`${key}: 불일치`);
			}
		}
	}
	return newMap;
};







