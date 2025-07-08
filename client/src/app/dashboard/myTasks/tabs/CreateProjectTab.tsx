"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, ArrowRight, Zap, Upload } from "lucide-react"

export default function CreateProjectTab() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <Card className="max-w-4xl mx-auto bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl flex items-center gap-3 text-white">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Target className="w-8 h-8 text-blue-400" />
          </div>
          Create New Project
        </CardTitle>
        <CardDescription className="text-gray-300 text-lg">
          Step {currentStep} of 4:{" "}
          {currentStep === 1
            ? "Project Details"
            : currentStep === 2
              ? "Requirements & Budget"
              : currentStep === 3
                ? "Timeline & Skills"
                : "Review & Publish"}
        </CardDescription>
        <div className="flex space-x-3 mt-6">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-3 flex-1 rounded-full transition-all duration-500 ${
                step <= currentStep
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30"
                  : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-semibold text-white">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Build a modern e-commerce website"
                  className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="category" className="text-base font-semibold text-white">
                  Category *
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white">
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                    <SelectItem value="writing">Writing & Content</SelectItem>
                    <SelectItem value="data-analysis">Data & Analytics</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="description" className="text-base font-semibold text-white">
                Project Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail. Include what you want to achieve, specific requirements, and any important details..."
                rows={8}
                className="bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 resize-none text-base leading-relaxed"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-base font-semibold text-white">
                  Budget Range *
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                    <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="priority" className="text-base font-semibold text-white">
                  Priority Level *
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="LOW">Low - No rush</SelectItem>
                    <SelectItem value="MEDIUM">Medium - Standard timeline</SelectItem>
                    <SelectItem value="HIGH">High - Important project</SelectItem>
                    <SelectItem value="URGENT">Urgent - ASAP delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="requirements" className="text-base font-semibold text-white">
                Specific Requirements
              </Label>
              <Textarea
                id="requirements"
                placeholder="List any specific technical requirements, deliverables, or constraints..."
                rows={6}
                className="bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 resize-none text-base leading-relaxed"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="deadline" className="text-base font-semibold text-white">
                  Project Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="duration" className="text-base font-semibold text-white">
                  Expected Duration
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="1-week">Less than 1 week</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-2-months">1-2 months</SelectItem>
                    <SelectItem value="2-6-months">2-6 months</SelectItem>
                    <SelectItem value="6-months+">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="skills" className="text-base font-semibold text-white">
                Required Skills & Technologies
              </Label>
              <Input
                id="skills"
                placeholder="e.g., React, Node.js, MongoDB, AWS (separate with commas)"
                className="h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="attachments" className="text-base font-semibold text-white">
                Project Files (Optional)
              </Label>
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-gray-800/20">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 font-medium">Drop files here or click to upload</p>
                <p className="text-sm text-gray-400 mt-2">Supports: PDF, DOC, PNG, JPG (Max 10MB)</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="bg-gray-800/40 rounded-xl p-8 space-y-6 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white">Project Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-gray-400 font-medium">Title:</span>
                  <p className="text-white font-semibold text-lg">Build a modern e-commerce website</p>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-400 font-medium">Category:</span>
                  <p className="text-white font-semibold">Web Development</p>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-400 font-medium">Budget:</span>
                  <p className="text-white font-semibold">$2,500 - $5,000</p>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-400 font-medium">Priority:</span>
                  <p className="text-white font-semibold">High</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-700/40 rounded-xl p-6">
              <h4 className="font-bold text-blue-300 mb-3 text-lg">🚀 Ready to Launch!</h4>
              <p className="text-blue-100 leading-relaxed">
                Your project will be visible to thousands of qualified freelancers. You will start receiving proposalswithin hours of publishing.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-8 border-t border-gray-700/50">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-600 hover:border-gray-500 bg-transparent text-gray-200 hover:text-white font-semibold"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
          >
            Previous Step
          </Button>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 font-semibold"
            onClick={() => {
              if (currentStep < 4) {
                setCurrentStep(currentStep + 1)
              }
            }}
          >
            {currentStep === 4 ? (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Publish Project
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
