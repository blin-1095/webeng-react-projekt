/*This file serves as a backlog for discarded components, which might be used again in the future.*/

{/* Right panel with reveal effect*/}
<Panel right reveal themeDark>
<View>
  <Page>
    <Navbar title="Right Panel" />
    <Block>Right panel content goes here</Block>
  </Page>
</View>
</Panel>
/*
 {//Popup}
 <Popup id="my-popup">
 <View>
   <Page>
     <Navbar title="Popup">
       <NavRight>
         <Link popupClose>Close</Link>
       </NavRight>
     </Navbar>
     <Block>
       <p>Popup content goes here.</p>
     </Block>
   </Page>
 </View>
</Popup>

<LoginScreen id="my-login-screen">
 <View>
   <Page loginScreen>
     <LoginScreenTitle>Login</LoginScreenTitle>
     <List form>
       <ListInput
         type="text"
         name="username"
         placeholder="Your username"
         value={username}
         onInput={(e) => setUsername(e.target.value)}
       ></ListInput>
       <ListInput
         type="password"
         name="password"
         placeholder="Your password"
         value={password}
         onInput={(e) => setPassword(e.target.value)}
       ></ListInput>
     </List>
     <List>
       <ListButton title="Sign In" onClick={() => alertLoginData()} />
       <BlockFooter>
         Some text about login information.<br />Click "Sign In" to close Login Screen
       </BlockFooter>
     </List>
   </Page>
 </View>
</LoginScreen>

*/