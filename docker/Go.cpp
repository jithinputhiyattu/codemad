#include <iostream>
#include <stdlib.h>
#include <unistd.h>
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
  strcpy(temporary,result);
  strcat(result,".output"); 
  strcat(temporary,".temporary");
 }

void copyFromHost(char*id,int argc ,char* argv[])
{

}

void compileAndRun(char*id,int argc ,char* argv[])
{

}
void copyToHost(char*id,int argc ,char* argv[])
{
	
}

void extractId(char*line_i,char*id_o)
{
	int i,j;
	for(i=0;i<strlen(line_i);i++)
	{
      if('@'==line_i[i])
      {
      	i++;
      	for(j=0;i<strlen(line_i)&&':'!=line_i[i];i++)
      	{
          id_o[j++] = line_i[i];
      	}
      	id_o[j++] ='\0';
      	break;
      }
	}
}

/*
  command line args 
  0 : program name
  1 : C/C++ file name
  2 : test cases
*/
int main(int argc,char *argv[])
{
  if(argc<2) return 0;
  char *cmd = new char[250];
  char *tmp = new char[250];
  setProgram(argv[1]);
  remove(temporary);
  int child_id =0;
  if((child_id=fork()))
  {
    sleep(1);
    FILE *fin=fopen(temporary,"r");
    if(fin)
    {
        char *line = new char[500]; 
        char *id = new char[100];
        fscanf(fin," %[^\n]",line);
        fclose(fin);
        extractId(line,id);
        cout<<endl<<id<<endl;
        //copy file to the continer
        copyFromHost(id,argc,argv);
        compileAndRun(id,argc,argv);
        copyToHost(id,argc,argv);

        //clean the memory and delete the continer...

        delete line;
        delete id;
    }
    else
    {
    	cout<<"error msg : "<<"error in file operation.."<<endl;
    }
    wait(NULL);
  }
  else
  {
  	//child process
    strcpy(cmd,"docker run -it ubuntu14 >> ");
    strcat(cmd,temporary);
    cout<<"executing : "<<cmd<<endl;
    system(cmd);
  }
  delete cmd;
  delete tmp;
  return 0;
}