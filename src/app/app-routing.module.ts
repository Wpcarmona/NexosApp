import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'resetpassword',
    loadChildren: () => import('./page/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },

  {
    path: 'profile/:id',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule)
    
  },
  
  
 


  
  
  
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
