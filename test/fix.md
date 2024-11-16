# Fixing “nodemon.ps1 cannot be loaded” Error: Enabling PowerShell Scripts in Windows

# Check the Execution Policy first:

o check the current execution policy, open PowerShell as an administrator and run the following command:

```
Get-ExecutionPolicy
```

defiantly you will get “Restricted” output.

# Let’s Start Fixing the Execution Policy:

- Enable scripts execution, you can set the execution policy to “RemoteSigned” By using this simple command:

```
Set-ExecutionPolicy RemoteSigned
```

- in case first way didn’t work for you Set Execution Policy to “Unrestricted” (not recommended for security reasons):

```
Set-ExecutionPolicy Unrestricted
```

- Still your problem did not resolved? try this last command :

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

# Conclusion:

By adjusting the execution policy in PowerShell, you’ll overcome the “nodemon.ps1 cannot be loaded” error and unleash the full potential of Nodemon on your Windows machine. Remember to choose an appropriate execution policy that balances convenience and security.

```
https://lakhan10.medium.com/npm-nodemon-ps1-8d1a929a22a8
```

# WSL FIX

```
https://github.com/microsoft/WSL/releases/
```