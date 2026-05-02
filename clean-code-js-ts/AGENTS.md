# Clean Code JS/TS Rules

**Version 1.0.0**  
Code Quality  
May 2026

> **Note:**  
> This document is for agents and LLMs to follow when generating, refactoring,  
> or reviewing JavaScript and TypeScript code. These rules enforce strict  
> consistency in code readability, maintainability, and architectural integrity.

---

## Abstract

Comprehensive clean code guidelines for JavaScript and TypeScript development, designed for AI agents and LLMs. Contains rules across 6 categories, prioritized by impact from critical (functional integrity) to high (readability). Each rule includes detailed explanations and real-world examples comparing incorrect vs. correct implementations to guide automated code generation.

---

## Table of Contents

1. [Variables](#1-variables) — **HIGH**
   - 1.1 [Use Meaningful and Pronounceable Names](#11-use-meaningful-and-pronounceable-names)
   - 1.2 [Use Searchable Names](#12-use-searchable-names)
   - 1.3 [Avoid Mental Mapping](#13-avoid-mental-mapping)
   - 1.4 [Don't Add Unneeded Context](#14-dont-add-unneeded-context)
2. [Functions](#2-functions) — **CRITICAL**
   - 2.1 [Limit Function Arguments (2 or fewer)](#21-limit-function-arguments-2-or-fewer)
   - 2.2 [Functions Should Do One Thing](#22-functions-should-do-one-thing)
   - 2.3 [Function Names Should Say What They Do](#23-function-names-should-say-what-they-do)
   - 2.4 [Avoid Flags as Parameters](#24-avoid-flags-as-parameters)
   - 2.5 [Avoid Side Effects](#25-avoid-side-effects)
3. [Objects and Classes](#3-objects-and-classes) — **HIGH**
   - 3.1 [Prefer ES6 Classes over ES5 Functions](#31-prefer-es6-classes-over-es5-functions)
   - 3.2 [Use Method Chaining](#32-use-method-chaining)
   - 3.3 [Prefer Composition over Inheritance](#33-prefer-composition-over-inheritance)
4. [SOLID Principles](#4-solid-principles) — **CRITICAL**
   - 4.1 [Single Responsibility Principle (SRP)](#41-single-responsibility-principle-srp)
   - 4.2 [Open/Closed Principle (OCP)](#42-openclosed-principle-ocp)
   - 4.3 [Liskov Substitution Principle (LSP)](#43-liskov-substitution-principle-lsp)
   - 4.4 [Interface Segregation Principle (ISP)](#44-interface-segregation-principle-isp)
   - 4.5 [Dependency Inversion Principle (DIP)](#45-dependency-inversion-principle-dip)
5. [Concurrency & Asynchrony](#5-concurrency--asynchrony) — **HIGH**
   - 5.1 [Use Promises and Async/Await](#51-use-promises-and-asyncawait)
6. [Error Handling & Comments](#6-error-handling--comments) — **MEDIUM**
   - 6.1 [Don't Ignore Caught Errors](#61-dont-ignore-caught-errors)
   - 6.2 [Only Comment Business Logic Complexity](#62-only-comment-business-logic-complexity)

---

## 1. Variables — **HIGH**

### 1.1 Use Meaningful and Pronounceable Names

**Rule:** Variable names should clearly state their intent without being cryptic.

**Incorrect:**
```javascript
const yyyymmdstr = moment().format("YYYY/MM/DD");
```

**Correct:**
```javascript
const currentDate = moment().format("YYYY/MM/DD");
```

### 1.2 Use Searchable Names

**Rule:** Extract "magic numbers" or strings into named constants to improve searchability and context.

**Incorrect:**
```javascript
// What is 86400000?
setTimeout(blastOff, 86400000);
```

**Correct:**
```javascript
const MILLISECONDS_PER_DAY = 86_400_000;
setTimeout(blastOff, MILLISECONDS_PER_DAY);
```

### 1.3 Avoid Mental Mapping

**Rule:** Be explicit. Don't force the reader to translate variable names.

**Incorrect:**
```javascript
locations.forEach(l => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // What is 'l' again?
  dispatch(l);
});
```

**Correct:**
```javascript
locations.forEach(location => {
  doStuff();
  doSomeOtherStuff();
  dispatch(location);
});
```

### 1.4 Don't Add Unneeded Context

**Rule:** If the class or object name tells you something, don't repeat it in its variable names.

**Incorrect:**
```javascript
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};
```

**Correct:**
```javascript
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};
```

---

## 2. Functions — **CRITICAL**

### 2.1 Limit Function Arguments (2 or fewer)

**Rule:** Limiting arguments makes testing and understanding functions easier. Use object destructuring for more than 2 arguments.

**Incorrect:**
```javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

**Correct:**
```javascript
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}
```

### 2.2 Functions Should Do One Thing

**Rule:** This is the most important rule in software engineering. When functions do more than one thing, they are harder to compose, test, and reason about.

**Incorrect:**
```javascript
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = db.find(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Correct:**
```javascript
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = db.find(client);
  return clientRecord.isActive();
}
```

### 2.3 Function Names Should Say What They Do

**Rule:** Use verbs that accurately describe the action.

**Incorrect:**
```javascript
function addToDate(date, month) {
  // ...
}

const date = new Date();
// It's hard to tell from the name what is added
addToDate(date, 1);
```

**Correct:**
```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);
```

### 2.4 Avoid Flags as Parameters

**Rule:** Flags tell your user that this function does more than one thing. Functions should do one thing.

**Incorrect:**
```javascript
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Correct:**
```javascript
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  fs.create(`./temp/${name}`);
}
```

### 2.5 Avoid Side Effects

**Rule:** A function produces a side effect if it does anything other than take a value and return another value(s). Prefer immutability.

**Incorrect:**
```javascript
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};
```

**Correct:**
```javascript
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};
```

---

## 3. Objects and Classes — **HIGH**

### 3.1 Prefer ES6 Classes over ES5 Functions

**Rule:** ES6 classes are more readable and provide a cleaner inheritance model.

**Incorrect:**
```javascript
const Animal = function(age) {
  this.age = age;
};

Animal.prototype.move = function() {};
```

**Correct:**
```javascript
class Animal {
  constructor(age) {
    this.age = age;
  }

  move() {}
}
```

### 3.2 Use Method Chaining

**Rule:** Return `this` at the end of each method to allow a more expressive API.

**Correct:**
```javascript
class Car {
  constructor() {
    this.make = "Honda";
    this.model = "Accord";
    this.color = "White";
  }

  setMake(make) {
    this.make = make;
    return this;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  save() {
    console.log(this.make, this.model, this.color);
    return this;
  }
}

const car = new Car().setMake("Ford").setModel("F-150").save();
```

---

## 4. SOLID Principles — **CRITICAL**

### 4.1 Single Responsibility Principle (SRP)

**Rule:** "There should never be more than one reason for a class to change."

**Incorrect:**
```javascript
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

**Correct:**
```javascript
class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

### 4.2 Open/Closed Principle (OCP)

**Rule:** Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

### 4.3 Dependency Inversion Principle (DIP)

**Rule:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Incorrect:**
```javascript
class AjaxAdapter {
  constructor() {
    this.name = "ajaxAdapter";
  }
}

class NodeAdapter {
  constructor() {
    this.name = "nodeAdapter";
  }
}

class HttpService {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    if (this.adapter.name === "ajaxAdapter") {
      return makeAjaxCall(url).then(response => {
        // transform response and return
      });
    } else if (this.adapter.name === "nodeAdapter") {
      return makeHttpCall(url).then(response => {
        // transform response and return
      });
    }
  }
}
```

**Correct:**
```javascript
class HttpService {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then(response => {
      // transform response and return
    });
  }
}

class AjaxAdapter {
  request(url) {
    // send request and return promise
  }
}

class NodeAdapter {
  request(url) {
    // send request and return promise
  }
}
```

---

## 5. Concurrency & Asynchrony — **HIGH**

### 5.1 Use Promises and Async/Await

**Rule:** Async/Await is even cleaner than Promises and significantly cleaner than Callbacks.

**Incorrect:**
```javascript
get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin", (requestErr, response) => {
  if (requestErr) {
    console.error(requestErr);
  } else {
    writeFile("article.html", response, writeErr => {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.log("File written");
      }
    });
  }
});
```

**Correct:**
```javascript
async function getCleanCodeArticle() {
  try {
    const response = await get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin");
    await writeFile("article.html", response);
    console.log("File written");
  } catch (err) {
    console.error(err);
  }
}
```

---

## 6. Error Handling & Comments — **MEDIUM**

### 6.1 Don't Ignore Caught Errors

**Rule:** Doing nothing with a caught error doesn't give you the ability to ever fix or react to said error. Log it or report it.

### 6.2 Only Comment Business Logic Complexity

**Rule:** Comments are an apology, not a requirement. Good code *is* documentation.

**Incorrect:**
```javascript
function hash(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

**Correct:**
```javascript
function hash(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```
