import { functionArguments, inEach } from "./utilities";

// Recoil API
const Recoil = {
  // `$` Updates State
  $: function(toUpdate) {
    for (const key in toUpdate) {
      switch (key) {
        // Check For Restricted Behavior
        case "$":
        case "$$":
        case "erupt":
          throw RecoilError("Cannot Modify Internal Functions");
        default:
          // Continue Object Update
          MutationLock.unlock();
          Recoil[key] = toUpdate[key];

          // If Binding Exists
          if (key in Bindings) {
            // Call All Functions That Contain Bindings
            inEach(Bindings[key], binding => {
              binding(Recoil[key]);
            });
          }

          break;
      }
    }
  },

  // `$$` Accepts A Function That,
  // Evaluates When Data Dependencies (State) Updates
  $$: function(reactiveFunction) {
    const reactiveFunctionArguments = functionArguments(reactiveFunction);

    inEach(reactiveFunctionArguments, arg => {
      // Bind `argument` To Array Of Dependent Functions
      if (arg in Bindings) {
        Bindings[arg].push(reactiveFunction);
      } else {
        Bindings[arg] = [reactiveFunction];
      }
    });

    // Callback With Arguments Binding To State
    return reactiveFunction(
      ...reactiveFunctionArguments.map(argument => Recoil[argument])
    );
  }
};

// (State => Function) Dependencies
const Bindings = {};

// Custom Recoil Error Messages
function RecoilError(message) {
  return new Error(`Recoil: ${message}`);
}

// Global Mutation Lock
const MutationLock = {
  locked: true,
  lock: function() {
    this.locked = true;
  },
  unlock: function() {
    this.locked = false;
  }
};

function ImmutableProxy(any) {
  switch (typeof any) {
    case "object":
    case "function":
      return new Proxy(any, {
        set: (target, property, value, receiver) => {
          // Check If Mutation Is Allowed, Coming From `$`
          if (!MutationLock.locked) {
            // Continue Assignment, Since Mutation Is Allowed/Unlocked
            target[property] = value;
            // Lock Mutation
            MutationLock.lock();
            // Mutation Succeeded
            return true;
          }

          if (property in target) {
            throw RecoilError(
              `Cannot Re-Assign ${property}, It Is Read-Only (Immutable).`
            );
          }

          // Continue Initial Assignment
          target[property] = value;
          return true;
        },

        get: (target, property, receiver) => {
          return ImmutableProxy(target[property]);
        }

        /*
        apply: (target, thisArg, argumentsList) => {
          return target(...argumentsList);
        }
        */
      });
  }

  return any;
}

export default ImmutableProxy(Recoil);
