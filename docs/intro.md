---
sidebar_position: 1
---

# Dumpster

Dumpster is a garbage collection utility package. It is helpful for realtime tracking & cleaning! Say no to memory leaks.

### .new
```lua
Dumpster.new() → Dumpster
```

Constructs/Creates a Dumpster Class

---

### Extend
```lua
Dumpster:Extend() → Dumpster
```

---

Extends the dumpster and adds it for cleanup. Returns the extended Dumpster.

### Construct
```lua
Dumpster:Construct(object: string | table | () → (), ...) → any?
```

Constructs a new Instance/Class from the given parameter.
If a table is passed, it will construct a new class of said table that has the constructor .new(...)
And proceeds to add the constructed item to the Dumpster.

---

### Clone
```lua
Dumpster:Clone(item: Instance) → Instance
```

Clones an Instance, and adds it to the dumpster for cleanup.

---

### Add

```lua
Dumpster:Add(object: any, cleanUpIdentifier: string?, customCleanupMethod: string?) → any
```

Adds an object to the dumpster.
- object - The object you want to add for cleanup.
- cleanUpIdentifier - will be used to identify your object.
- customCleanupMethod - use if you are adding your own class and the cleanup method is not called :Destroy().

---

### Remove

```lua
Dumpster:Remove(object: any, dontCallCleanMethod: boolean?) → any
```

Attempts to remove the provided object from the dumpster.
- if your object is a function, and you do not want it to be called, simply set the value of paremeter "dontCallCleanMethod" to true.

---

### AddPromise

```lua
Dumpster:AddPromise(promise: Promise, cleanUpIdentifier: string?) → Instance
```

Adds a promise to the dumpster for cleanup.
- cleanUpIdentifier - will be used to identify your object.

---

---

### SetAttribute

```lua
Dumpster:SetAttribute(attrName: string, value: any) → Instance
```

Adds an attribute to the dumpster, helpful for tracking.

---

### GetAttribute

```lua
Dumpster:GetAttribute(attrName: string) → Instance
```

Returns the value that was given from dumpster:SetAttribute(attrName)

---

### Connect

```lua
Dumpster:Connect(signal: RBXScriptSignal, connectFunction: (any)→(any), cleanupIdentifier: string?) → any
```

Creates a connection and automatically adds it to the dumpster based on the signal provided along with the callback function.

---

### AttachTo

```lua
Dumpster:AttachTo(item: any) → ()
```

Attaches a dumpster to an Instance, TweenBase, Sound, AnimationTrack, RBXScriptSignal, tables with Connect method. Once the object's lifespan has ended or said signal is fired, dumpster will be destroyed. (Most GCS cannot be attached to characters&players, but with dumpsters, you can!)

---

### BindToRenderStep

```lua
Dumpster:BindToRenderStep(name: string, priority: number, func: (dt: number)->(any)) → ()
```

Alias for `RunService:BindToRenderStep(...)`, however `RunService:UnbindFromRenderStep` will be called once the dumpster is destroyed.

---

### UnbindFromRenderStep

```lua
Dumpster:UnbindFromRenderStep(name: string) → ()
```

-  `RunService:UnbindFromRenderStep` will be called.

---

### Clean

```lua
Dumpster:Clean() → ()
```

Alias for :Destroy()

---

### Destroy

```lua
Dumpster:Destroy() → ()
```

Cleans up and destroys the dumpster.