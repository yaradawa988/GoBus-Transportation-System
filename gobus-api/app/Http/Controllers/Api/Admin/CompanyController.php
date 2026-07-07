<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Storage;
class CompanyController extends Controller
{
    /**
     * Display all companies
     */
    public function index()
    {
        $companies = Company::latest()->get();

        return response()->json([
            'status' => true,
            'count'  => $companies->count(),
            'data'   => $companies
        ]);
    }

    /**
     * Store new company
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255|unique:companies,name',
            'logo'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'phone'       => 'nullable|string|max:20',
            'email'       => 'nullable|email|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:active,inactive',
        ]);

        $data = $request->only([
            'name',
            'phone',
            'email',
            'description',
            'status',
        ]);

        if ($request->hasFile('logo')) {
            $data['logo'] = $request
                ->file('logo')
                ->store('companies', 'public');
        }

        $company = Company::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Company created successfully.',
            'data' => $company
        ], 201);
    }

    /**
     * Display single company
     */
    public function show($id)
    {
        $company = Company::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $company
        ]);
    }

    /**
     * Update company
     */
    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $request->validate([
            'name'        => 'required|string|max:255|unique:companies,name,' . $company->id,
            'logo'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'phone'       => 'nullable|string|max:20',
            'email'       => 'nullable|email|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:active,inactive',
        ]);

        $data = $request->only([
            'name',
            'phone',
            'email',
            'description',
            'status',
        ]);

        if ($request->hasFile('logo')) {

            if ($company->logo && Storage::disk('public')->exists($company->logo)) {
                Storage::disk('public')->delete($company->logo);
            }

            $data['logo'] = $request
                ->file('logo')
                ->store('companies', 'public');
        }

        $company->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Company updated successfully.',
            'data' => $company->fresh()
        ]);
    }

    /**
     * Delete company
     */
    public function destroy($id)
    {
        $company = Company::findOrFail($id);

        if ($company->trips()->exists()) {

            return response()->json([
                'status' => false,
                'message' => 'Company has trips and cannot be deleted.'
            ], 422);
        }

        if ($company->logo && Storage::disk('public')->exists($company->logo)) {
            Storage::disk('public')->delete($company->logo);
        }

        $company->delete();

        return response()->json([
            'status' => true,
            'message' => 'Company deleted successfully.'
        ]);
    }
}