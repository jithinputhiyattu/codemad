#include <iostream>
#include <stdlib.h>
#include <unistd>
#include <sys/wait.h>
#include <string.h>
#include <stdio.h>
using namespace std;

char result[250];
char temporary[250];
void setProgram(char *source)
 {
   int i =0;
   for(i=0;i<strlen(source);i++)
   {
     if('.'==source[i])
      {
       result[i]='\0';
       break;
      }
      result[i] = source[i];
   }
  strcat(result,".output"); 
  strcpy(temporary,result);
  strcat(temporary,".temporary");
 }
/*
  command line args 
  0 : program name
  1 : C/C++ file name
  2 : test cases
*/
int main(int argv,char *argv[])
{
  if(argv<2) return 0;
  char *cmd = new char[250];
  char *tmp = new char[250];
  setProgram(argv[1]);
  strcpy(cmd,"docker run -it --rm -m 32m ubuntu14 > ");
  strcat(cmd,temporary);
  cout<<"executing : "<<cmd<<endl;
  system(cmd);
  int child_id =0;
  if(child_id=fork())
  {


  }
  else
  {
  	//child process
  }
  delete cmd;
  delete tmp;
  return 0;
}