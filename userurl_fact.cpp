 /* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia beatae fugit ut itaque eos odio libero accusamus, aliquid ducimus maxime. Necessitatibus consectetur id repellendus atque ipsum, dicta aperiam nam quam.*/
#include<iostream>
#include<stdlib.h>
using namespace std;

int fact(int n)
 {
  if(n<2) return 1;
  return n * fact(n-1);
 }
int main(int argc,char *argv[])
{
 int in,out;
 for(int i=1;i < argc;i++)
 {
  in = atoi(argv[i]);
  out = fact(in);
  cout << out << endl;
 }
 return 0;
}
              