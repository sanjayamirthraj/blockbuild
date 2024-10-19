'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FlowGraph: React.FC = () => {
  return (
    <Card className="p-4 space-y-4">
      <Select defaultValue="25%">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select percentage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="25%">25%</SelectItem>
          <SelectItem value="35%">35%</SelectItem>
          <SelectItem value="40%">40%</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex items-center space-x-2">
        <div className="bg-red-500 w-4 h-4 rounded-full" />
        <Select defaultValue="AVA">
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AVA">AVA</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">📋</Button>
      </div>
      
      <Select defaultValue="Current Price of ETH is greater than $2,500">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Current Price of ETH is greater than $2,500">Current Price of ETH is greater than $2,500</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex items-center space-x-2">
        <Select defaultValue="USDC">
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">📋</Button>
      </div>
      
      <div>ELSE</div>
      
      <div className="flex items-center space-x-2">
        <Select defaultValue="ETH">
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ETH">ETH</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">📋</Button>
      </div>
      
      <Select defaultValue="40%">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select percentage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="40%">40%</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon">SORT</Button>
        <span>Current Market Cap</span>
        <Button variant="outline" size="icon">SELECT</Button>
        <Select defaultValue="Top 2">
          <SelectTrigger>
            <SelectValue placeholder="Select top" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Top 2">Top 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {['DEGEN', 'TOSHI', 'META', 'DOGE', 'TRUMP', 'RAVI'].map((token) => (
        <div key={token} className="flex items-center space-x-2">
          <Select defaultValue={token}>
            <SelectTrigger>
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={token}>{token}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">📋</Button>
        </div>
      ))}
      
      <Button variant="outline" size="icon">+</Button>
    </Card>
  );
};

export default FlowGraph;
