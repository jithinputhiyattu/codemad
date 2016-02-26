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
 char *cmd = new char[250];
 strcpy(cmd,"docker cp ");
 strcat(cmd,argv[1]);
 strcat(cmd," "); 
 strcat(cmd,id); 
 strcat(cmd,":/");
 strcat(cmd,argv[1]);
 cout<<"executing : "<<cmd<<endl;
 system(cmd);
 for(int i=2;i<argc;i++)
 {
 	strcpy(cmd,"docker cp ");
    strcat(cmd,argv[i]);
    strcat(cmd,".in "); 
    strcat(cmd,id); 
    strcat(cmd,":/");
    strcat(cmd,argv[i]);
    strcat(cmd,".in"); 
    cout<<"executing : "<<cmd<<endl;
    system(cmd);

    strcpy(cmd,"docker cp ");
    strcat(cmd,argv[i]);
    strcat(cmd,".key "); 
    strcat(cmd,id); 
    strcat(cmd,":/");
    strcat(cmd,argv[i]);
    strcat(cmd,".key"); 
    cout<<"executing : "<<cmd<<endl;
    system(cmd);
 }
 delete cmd;
}

void compileAndRun(char*id,int argc ,char* argv[])
{
 char *cmd = new char[250];
 strcpy(cmd,"docker exec ");
 strcat(cmd,id);
 strcat(cmd," ./Compile.out");
 for(int i=1;i<argc;i++)
 {
   strcat(cmd," ");
   strcat(cmd,argv[i]);
 }
 cout<<"executing : "<<cmd<<endl;
 system(cmd);
 delete cmd;
}
void copyToHost(char*id,int argc ,char* argv[])
{
 char *cmd = new char[250];
 strcpy(cmd,"docker cp ");
 strcat(cmd,id);
 strcat(cmd,":/");
 strcat(cmd,result);
 strcat(cmd," "); 
 strcat(cmd,result);
 cout<<"executing : "<<cmd<<endl;
 system(cmd);
 delete cmd;
}

void removeContiner(char* id)
{
 char *cmd = new char[250];
 strcpy(cmd,"docker rm -f ");
 strcat(cmd,id);
 cout<<"executing : "<<cmd<<endl;
 system(cmd);
 delete cmd;
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
    sleep(3);
    FILE *fin=fopen(temporary,"r");
    if(fin)
    {
        char *line = new char[500]; 
        char *id = new char[100];
        fscanf(fin," %[^\n]",line);
        fclose(fin);
        extractId(line,id);
        //copy file to the continer
        copyFromHost(id,argc,argv);
        sleep(1);
        int run_child=0;
        if(run_child=fork())
        {
            sleep(4);
            copyToHost(id,argc,argv);
            if(run_child)
            {
		       kill(run_child, SIGKILL);
		    }
            //clean the memory and delete the continer...
            removeContiner(id);
            wait(NULL);
        }
        else
        {
          compileAndRun(id,argc,argv);
        }
        delete line;
        delete id;
    }
    else
    {
    	cout<<"error msg : "<<"error in file operation.."<<endl;
        kill(child_id, SIGKILL);
    }
    wait(NULL);
  }
  else
  {
  	//child process
    strcpy(cmd,"docker run -t ubuntu14 >> ");
    strcat(cmd,temporary);
    cout<<"executing : "<<cmd<<endl;
    system(cmd);
  }
  delete cmd;
  delete tmp;
  return 0;
}