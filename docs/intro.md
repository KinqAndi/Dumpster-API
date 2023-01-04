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

#### Examples
```lua
local dumpster = Dumpster.new()
--creates a new dumpster class that you can dump connections/instances for garbage collection purposes.
```

---

### Extend
```lua
Dumpster:Extend() → Dumpster
```
#### Examples
```lua
local dumpster = Dumpster.new()
local subDumpster = dumpster:Extend()
subDumpster:Add(part)
--creates a sub dumpster class, and adds it to the main dumpster. Will be destroyed once main dumpster is destroyed.
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

#### Examples
```lua
local weaponModule = require(script.Parent.Weapon)

local dumpster = Dumpster.new()--constructing a new dumpster
local weapon = dumpster:Construct(weaponModule, 3, Color3.fromRGB(255,255,255))

weapon.Name = "AK-47"
--constructs a class and adds it to the dumpster
```

---

### Clone
```lua
Dumpster:Clone(item: Instance) → Instance
```

Clones an Instance, and adds it to the dumpster for cleanup.

#### Examples
```lua
local part = workspace.Part -- referencing a random part
local dumpster = Dumpster.new()--constructing a new dumpster

local clonedPart = dumpster:Clone(part)
clonedPart.Name = "MyClonedPart"
clonedPart.Parent = workspace
--clones an instance and adds it to the dumpster
```

---

### Add

```lua
Dumpster:Add(object: any, cleanUpIdentifier: string?, customCleanupMethod: string?) → any
```

Adds an object to the dumpster.
- object - The object you want to add for cleanup.
- cleanUpIdentifier - will be used to identify your object.
- customCleanupMethod - use if you are adding your own class and the cleanup method is not called :Destroy().

#### Examples
```lua
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Add(part) -- this part will be deleted once the dumpster has been destroyed.

dumpster:Add(function() -- this will run once the dumpster has been destroyed.
    print("I have been destroyed :(")
end)

dumpster:Add(button.Activated:Connect(function() -- this will disconnect the connection once the dumpster has been destroyed.
    --button has been clicked
end))

--We can also add instances/classes with extra paremeters

dumpster:Add(weapon, "myWeapon") -- the second argument gives your object an identfier so it could be removed from :Remove method in realtime.

--There is also a third argument, "customCleanupMethod" which is for custom clean up methods for modules.
--Let's say the weaponModule has a cleanup method called :Explode()
--To add it for cleanup we can do the following:

dumpster:Add(weapon, "myWeapon", "Explode")
```

---

### Remove

```lua
Dumpster:Remove(object: any, dontCallCleanMethod: boolean?) → any
```

Attempts to remove the provided object from the dumpster.
- if your object is a function, and you do not want it to be called, simply set the value of paremeter "dontCallCleanMethod" to true.

#### Examples
```lua
local part = workspace.Part -- referencing random part
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Add(part, "randomPart")

dumpster:Remove("randomPart") -- NOTE: You can also pass in the object itself.

dumpster:Destroy()

--Once the dumpster is destroyed, since we removed it from memory. the referenced part will no longer be deleted.
```

Let's look at another example

```lua
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Add(function()
    print("i have been destroyed")
end, "myFunction")

dumpster:Remove("myFunction")

--Then the function being removed from the dumpster will be ran
--So the output would be "i have been destroyed"

--HOWEVER, by passing a new argument in as a boolean, you can disregard this function by doing the following

dumpster:Add(function()
    print("i have been destroyed")
end, "myFunction")

dumpster:Remove("myFunction", true)

--Now, this function will no longer run.
```
---

### AddPromise

```lua
Dumpster:AddPromise(promise: Promise, cleanUpIdentifier: string?) → Instance
```

Adds a promise to the dumpster for cleanup.
- cleanUpIdentifier - will be used to identify your object.

#### Examples
```lua
local Promise = require(script.Promise) -- Promise Utility Package
local dumpster = Dumpster.new()--constructing a new dumpster

local newPromise = Promise.new(function(resolve, reject)--Creating a new promise class
    --some code here.
end)

dumpster:Add(newPromise) --Adds the promise to the dumpster, will cancel once the dumpster is destroyed.
```

---

### Connect

```lua
Dumpster:Connect(signal: RBXScriptSignal, connectFunction: (any)→(any)) → any
```

Creates a connection and automatically adds it to the dumpster based on the signal provided along with the callback function.

#### Examples
```lua
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Connect(button.Activated, function()
    --button has been activated
end) 
-- creates a new connection for the signal that calls the function. Automatically adds it to the dumpster for cleanup.
--Wrapper for :Add
```

---

### AttachTo

```lua
Dumpster:AttachTo(item: any) → ()
```

Attaches a dumpster to an Instance, TweenBase, Sound or AnimationTrack. Once the object's lifespan has ended, dumpster will be destroyed.

#### Examples
```lua
local part = workspace.Part -- referencing some random part
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Add(function()
    print("I have been destroyed.")
end)

dumpster:AttachTo(part)

part:Destroy()
--Since the dumpster is attached to the part, and the part just got destroyed. That means the dumpster would be destroyed as well.
```

:::note
Dumpsters could be Attached To [**Instances**](https://create.roblox.com/docs/reference/engine/datatypes/Instance),
[**AnimationTracks**](https://create.roblox.com/docs/reference/engine/classes/AnimationTrack),
[**Sound**](https://create.roblox.com/docs/reference/engine/classes/Sound),
[**Tweens**](https://create.roblox.com/docs/reference/engine/classes/Tween),
:::

---

### BindToRenderStep

```lua
Dumpster:BindToRenderStep(name: string, priority: number, func: (dt: number)->(any)) → ()
```

Alias for `RunService:BindToRenderStep(...)`, however `RunService:UnbindFromRenderStep` will be called once the dumpster is destroyed.

#### Examples
```lua
--Note this will only run if the dumpster is created on the client.
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:BindToRenderStep("cameraMovement", Enum.RenderPriority.Camera.Value-1, function(deltaTime: number)
    workspace.CurrentCamera.CFrame = CFrame.lookAt(Vector3.new(0,0,0), Vector3.new(0,0,5))
end)
--This will bind the function to render stepped.
--Will automaticall be unbinded once the dumpster has been destroyed.
```

---

### UnbindFromRenderStep

```lua
Dumpster:UnbindFromRenderStep(name: string) → ()
```

-  `RunService:UnbindFromRenderStep` will be called.

#### Examples
```lua
--Note this will only run if the dumpster is created on the client.
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:BindToRenderStep("cameraMovement", Enum.RenderPriority.Camera.Value-1, function(deltaTime: number)
    workspace.CurrentCamera.CFrame = CFrame.lookAt(Vector3.new(0,0,0), Vector3.new(0,0,5))
end)
--Let's take the code from above, and let's now unbind it.

dumpster:UnbindFromRenderStep("cameraMovement")
--The function is no longer binded to render stepped.
```

---

### Clean

```lua
Dumpster:Clean() → ()
```

Alias for :Destroy()

#### Examples
```lua
--Note this will only run if the dumpster is created on the client.
local part = workspace.Part -- referencing some random part
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Add(part)
dumpster:Clean()
--:Clean is an alias for :Destroy, therefore it will destroy the dumpster and clean up objects added to it.
```

---

### Destroy

```lua
Dumpster:Destroy() → ()
```

Cleans up and destroys the dumpster.

#### Examples
```lua
--Note this will only run if the dumpster is created on the client.
local part = workspace.Part -- referencing some random part
local dumpster = Dumpster.new()--constructing a new dumpster

dumpster:Add(part)
dumpster:Destroy()
--It will destroy the dumpster and clean up objects added to it.
```
