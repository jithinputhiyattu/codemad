#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
using namespace std;
/*
Input
-----
  Command line arguments
  0      : program currently in execution
  1      : c/c++ source file name
  next n : list of input files with extension .in
  next n : list of expected ouput with extension .key

Output
------
  n output files with extension .out which contain the output corresponding to the correspondin .in files
  A file with name of the source file with extension .res which contain the result in table form
  Input  TotalTC PassedTC   Score
  -----  ------- --------   -----
  1       5        4        80
  return value is the % value of sum of scores

*/


/////some global variables

char program[250];
char result[250];

void setProgram(char *source)
 {
   int i =0;
   for(i=0;i<strlen(source);i++)
   {
     if('.'==source[i])
      {
       program[i]='\0';
       break;
      }
      program[i] = source[i];
   }
  strcpy(result,program);
  strcat(result,".output");
  strcat(program,".out");
 }

int compileSource(char *source)
 {
  char *cmd = new char[1000];
  strcpy(cmd,"g++ ");
  strcat(cmd,source);
  strcat(cmd," -o ");
  int length,i=0;
  // calculate current length of the command
  strcat(cmd," ");
  strcat(cmd,program);
  cout<<"executing : "<<cmd<<endl;
  system(cmd);
  delete cmd;
 }

int compareResult(char*output,char*key)
{
  int result = 0;
  FILE *fout= fopen(output,"r+");
  FILE *fkey= fopen(key,"r+");

  if(NULL==fout||NULL==fkey)
  {
    cout<<"error msg : invalid input file name "<<output<<" || "<<key<<endl;
  }
 do
 {
  if(fgetc(fkey)==fgetc(fout))
   {
    result++;
   }
  else
   {
    result=0;
    break;
   }
 }
 while(!feof(fkey)&&!feof(fout));
 fclose(fkey);
 fclose(fout);
 return result;
}

void execcuteCode(char*outFile,char*input,char*result)
{
  FILE *fin= fopen(input,"r");
  if(NULL==fin)
  {
    cout<<"error msg : invalid input file name "<<input<<endl;
  }
 char* cmd = new char [3000];
 strcpy(cmd,"./");
 strcat(cmd,outFile);
 strcat(cmd,"  ");
 int i=strlen(cmd)-1;
 do
 {
  cmd[i] = fgetc(fin);
  i++;
 }while(!feof(fin)&& i<2500);
 cmd[i-2]=' ';
 cmd[i-1]='\0';
 strcat(cmd," > ");
 strcat(cmd,result);
 cout<<"executing : "<<cmd<<endl;
 system(cmd);
 delete cmd;
}

// ./Compile.out fact.cpp fact_1.in fact_2.in fact_3.in

void writeResult(const char *line)
{
 FILE *fres =fopen(result,"a+");
 if(NULL!=fres)
  {
   fprintf(fres,"%s\n",line);
  }
 fclose(fres);
}

void init()
 {
  writeResult("In   Out  Key  Score");
 }

int main(int argc,char* argv[])
{
 setProgram(argv[1]);
 init();
 int nTc = (argc-2);// give number of input files or number of test cases
 compileSource(argv[1]);
 char *in  = new char[250];
 char *out = new char[250];
 char *key = new char[250];
 char *res = new char[250];
 for(int i=0;i<nTc;i++)
 {
  strcpy(in,argv[2+i]);
  strcpy(out,argv[2+i]);
  strcpy(key,argv[2+i]);
  strcat(in,".in");
  strcat(out,".out");
  strcat(key,".key");
  execcuteCode(program,in,out);
  if(compareResult(out,key))
   {
    sprintf(res,"%03d  %03d  %03d  Passed",i+1,i+1,i+1);
   }
  else
   {
    sprintf(res,"%03d  %03d  %03d  Failed",i+1,i+1,i+1);
   }
  writeResult(res);
 }
 strcpy(res,"cat ");
 strcat(res, result);
 cout<<"executing : "<<res<<endl;
 system(res);
 delete in;
 delete out;
 delete key;
 delete res;
 return 0;
}
